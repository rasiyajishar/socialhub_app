const { getPost,getuserPosts,createPost,
    updatePost,deletePost,likePost,
    dislikePost,getTimelinePosts,} = require("../controllers/postController")
    const verifyToken = require('../middlewares/auth')
const postRouter = require('express').Router()
postRouter.get('/find/:id',getPost)
postRouter.get('/find/userposts/:id',getuserPosts);
postRouter.post('/createPost',verifyToken,createPost)
postRouter.get('/timelinePosts',verifyToken, getTimelinePosts);




postRouter.put('/updatePost/:id',verifyToken,updatePost)
postRouter.put('/likePost/:postid',verifyToken,likePost)
postRouter.put('/dislikePost/:postid',verifyToken,dislikePost)
postRouter.delete('/deletePost/:id',verifyToken,deletePost)

module.exports = postRouter