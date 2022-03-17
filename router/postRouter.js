const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')


router.post('/post', postController.CreatePost)
router.get('/post', postController.GetPost)
router.get('/post/:id',postController.GetPostById)
router.post('/post/delete/:id', postController.DeletePost)
router.post('/post/edit/:id', postController.EditPost)

module.exports = router