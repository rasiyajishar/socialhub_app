const User = require ('../models/User')
const Post = require('../models/Post')

const getPost = async(req,res)=>{
    try {
    const post = await Post.findById (req.params.id)   
    return res.status(200).json(post)
    } catch (error) {
     return res.status(500).json(error.message)   
    }
}


const getuserPosts = async(req,res)=>{
    try {
      const userposts=await Post.find({userId:req.params.id})
      return res.status(200).json(userposts)  
    } catch (error) {
     return res.status(500).json(error.message)   
    }
}

const createPost = async(req,res)=>{
    try {
     const isempty = Object.values(req.body).some((value) => !value)

     if (isEmpty) {
        throw new Error("Fill all fields!");
    }

    const post = await Post.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(post)
} catch (error) {
    return res.status(500).json(error.message);
}
};
module.exports = {
    getPost,
    getuserPosts,
    createPost}