const {
  User,
  Post
} = require('../models')


const CreatePost = async (req, res) => {
  const {
    user_uuid,
    title,
    content
  } = req.body

  try {
    const user = await User.findOne({
      where: {
        uuid: user_uuid
      }
    })

    const post = await Post.create({
      title,
      content,
      user_uuid: user.uuid
    })

    return res.status(201).json({
      message: "Post Successfully Created",
      data: post
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}

const GetPost = async (req, res) => {
  try {
    const findposts = await Post.findAll({
      include: 'user'
    })

    if (findposts) {
      return res.status(200).json({
        message: "Posts Successfully Found",
        data: findposts
      })
    } else {
      return res.status(404).json({
        message: "Post Data Is Empty"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}

const GetPostById = async (req, res) => {
  try {
    const id = req.params.id

    const findPost = await Post.findOne({
      where: {
        uuid: id
      },
      include: 'user'
    })

    if (findPost) {
      return res.status(200).json({
        message: "Post Successfully Found",
        data: findPost
      })
    } else {
      res.status(404).json({
        message: "Post Not Found"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message
    })
  }
}

const EditPost = async (req, res) => {
  try {
    const id = req.params.id
    const {
      title,
      content
    } = req.body

    const findPost = await Post.findOne({
      where: {
        uuid: id
      }
    })

    if (!findPost) {
      res.status(404).json({
        message: "Post Not Found"
      })
    }

    if (title) {
      findPost.title = title
    }
    if (content) {
      findPost.content = content
    }

    await findPost.save()

    return res.status(200).json({
      message: "Post Successfully Updated",
      data: findPost
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const DeletePost = async (req, res) => {
  try {
    const id = req.params.id

    const postToDelete = await Post.findByPk(id)
    if (postToDelete) {
      await Post.destroy({
        where: {
          uuid: id
        }
      })

      res.status(200).json({
        message: "Post Successfully Deleted"
      })
    } else {
      res.status(400).json({
        message: "Post Not Found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

}


module.exports = {
  CreatePost,
  GetPost,
  GetPostById,
  DeletePost,
  EditPost
}