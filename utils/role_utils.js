import {Post } from "../models/post_model.js"
export const isAdmin=(req,res,next)=>{
    
        if(req.user.role!="Admin")
    {
        return res.status(403).json({ message: 'Permission denied: Admins only' })
    }
    next();
   
   
}


export const isAdminorAuthor=async(req,res,next)=>{
    const {PostId,userId}=req.params.id;
    try {
    const post=await Post.findById(PostId);
    if(!post){
        return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.author.toString() === userId.toString() || req.user.role === 'Admin') {
        return next(); 
     } else {
        return res.status(403).json({ message: 'Permission denied: You are not the owner of this post' });
     }
  } catch (error) {
     return res.status(500).json({ message: 'Server error while checking post' });
  }
}