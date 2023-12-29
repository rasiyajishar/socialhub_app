// Import necessary modules
const express = require('express');
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/auth');

// Create a router instance
const postRouter = express.Router();

// Define routes
postRouter.get('/find/:id', postController.getPost);
postRouter.get('/find/userposts/:id', postController.getuserPosts);
postRouter.post('/createPost', verifyToken, postController.createPost);
postRouter.get('/timelinePosts', verifyToken, postController.getTimelinePosts);
postRouter.put('/updatePost/:id', verifyToken, postController.updatePost);
postRouter.put('/likePost/:postid', verifyToken, postController.likePost);
postRouter.put('/dislikePost/:postid', verifyToken, postController.dislikePost);
postRouter.delete('/deletePost/:id', verifyToken, postController.deletePost);

// Export the router
module.exports = postRouter;
