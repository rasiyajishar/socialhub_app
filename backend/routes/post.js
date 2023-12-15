const { getPost,getuserPosts,createPost,
    updatePost,deletePost,likePost,
    dislikePost,getTimelineposts
} = require("../controllers/postController")
const verifyToken = require("../models/auth")
const postRouter = require('express').Router()
postRouter.get('/find/:id',getPost)
postRouter.get('/find/userposts/:id',getuserPosts)
postRouter.get('/timelinePosts',getTimelineposts)

postRouter.post('/',verifyToken,createPost)
postRouter.put('updatePost/:id',verifyToken,updatePost)
postRouter.put('/likePost/:postid',verifyToken,likePost)
postRouter.put('dislikePost/:postid',verifyToken,dislikePost)
postRouter.delete('/deletePost/:id',verifyToken,deletePost)

module.exports = postRouter