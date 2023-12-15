const User = require ('../models/User')
const Post = require('../models/Post')

const getPost = async(req,res)=>{
    try {
    const post = await Post.findById (req.params.postId)   
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

     if (isempty) {
        throw new Error("Fill all fields!");
    }

    const post = await Post.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(post)
} catch (error) {
    return res.status(500).json(error.message);
}
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
           throw new Error ("no such a post")
        }
        if (post.userId === req.user.id) {
            await post.delete()
            console.log('hey');
            return res.status(200).json({ msg: "Successfully deleted post" });
        } else {
            throw new Error("You can only delete your own posts");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updatePost = async(req,res) =>{
    try {
       const post = await Post.findById(req.params.id) 
       if(post.userId == req.user.id){
        const updatedPost = Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.status(200).json(updatedPost)
       }else{
        throw new Error ("you can not update,you can update your own post ")
       }
    } catch (error) {
       return res.status(500).json(error.message) 
    }
}


const likePost= async(req,res)=>{
    try {
       const  post = await Post.findById(req.params.postId)
       if(!post){
        throw new Error("no such a post")
       }
       const likedpostbyuser= post.likes.includes(req.user.id)
       if(likedpostbyuser){
        throw new Error("can not like more than one time")
       }else{
        await Post.findByIdAndUpdate(
            req.params.postId,
            {$push:{likes:req.user.id}},
            {new:true}
        )
        return res.status(200).json({msg:"post has been successfully likes"})
       }
    } catch (error) {
      return res.status(500).json(error.message)  
    }
}


module.exports = {
    getPost,
    getuserPosts,
    createPost,deletePost,updatePost,likePost
}