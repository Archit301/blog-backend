import {Comment} from "../models/coment_model.js"
import {Post} from "../models/post_model.js"
import { User } from "../models/user_model.js";

export const createcomment=async(req,res,next)=>{
    const {content,userId,postId}=req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
          const comment = new Comment({
            content,
            post: postId,
            author: userId
          });
      
          await comment.save();
      
          res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });    
    }
}

export const getcommentbypost=async(req,res,next)=>{
    const {postId}=req.params;
    try {
        const comments = await Comment.find({ post: postId })
        .populate('author', 'username email')
        .populate('replies', 'content author');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });   
    }
}

export const deletecomment=async(req,res,next)=>{
    const { commentId } = req.params;
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const user=await User.findOne(userId)
      if (comment.author.toString() !== userId.toString()&&user.role!="Admin") {
        return res.status(403).json({ message: 'You are not authorized to delete this comment' });
      }
      await comment.remove();

      res.status(200).json({ message: 'Comment deleted successfully' });
  
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}



export const repliescomment=async(req,res,next)=>{
    const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const reply = new Comment({
        content,
        post: comment.post, 
        author: userId
      });  
      await reply.save();
      comment.replies.push(reply._id);
      await comment.save();
      res.status(201).json({ message: 'Reply added successfully', reply });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}


export const likedcomment=async(req,res,next)=>{
    const { commentId } = req.params;

    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      comment.likes += 1;
      await comment.save();
      res.status(200).json({ message: 'Comment liked', comment });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
}