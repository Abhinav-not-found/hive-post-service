import express from 'express'
import { createPost, getProfilePosts, deletePost, getFeed } from '../controllers/post.controller.js'
import authenticateToken from '../middleware.js'
import { uploadSingleImage } from '../multer.js'

const router = express.Router()

// make - update

router.get('/', async (req, res) => {
  res.send('Post service route is working')
})

router.get('/getProfilePosts/:id', getProfilePosts)
router.post('/create/:id', uploadSingleImage, createPost)
router.delete('/delete/:postId', deletePost)

router.get('/feed', getFeed)

export default router
