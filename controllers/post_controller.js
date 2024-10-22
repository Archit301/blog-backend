import {Post} from "../models/post_model.js"


export const Addpost=async(req,res,next)=>{
    const { title, content, avatar, tags, categories, userId } = req.body;
try {
    const postExists = await Post.findOne({
        title: title,
        author: userId
    });

    if (postExists) {
        return res.status(409).json({ message: 'Post with this title already exists for this user!' });
    }
    const post = new Post({
        title,
        content,
        avatar,
        tags,
        categories,
        author: userId
    });

    await post.save();
    return res.status(201).json({
        message: 'Post successfully created!',
        post: { title, content, avatar, tags, categories }
    });
} catch (error) {
    return res.status(500).json({ message: 'Server error !' }); 
}
}



export const updatePost = async (req, res, next) => {
    const { postId } = req.params; 
    const { title, content, avatar, tags, categories } = req.body; 

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' });
        }
        if (title) post.title = title;
        if (content) post.content = content;
        if (avatar) post.avatar = avatar;
        if (tags) post.tags = tags;
        if (categories) post.categories = categories;
        const updatedPost = await post.save();
        return res.status(200).json({
            message: 'Post successfully updated!',
            post: updatedPost
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });
    }
};



export const deletepost=async(req,res,next)=>{
    const { postId } = req.params; 
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found!' });
        }
        return res.status(200).json({
            message: 'Post successfully deleted!',
            post: deletedPost
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });   
    }
}


export const likepost=async(req,res,next)=>{
    const { postId } = req.params; 
    const userId=req.body.userId;
    try {
        const post = await Post.findById(postId);
        if(!post){
         return res.status(404).json({ message: 'Post not found!' });
        } 
       if(post.likedBy.includes(userId))
       {
    return res.status(400).json({ message: 'You have already liked this post!' });   
       }
       if (post.dislikedBy.includes(userId)) {
        post.dislikedBy.pull(userId); 
        post.dislikes -= 1;         
    }
    post.likedBy.push(userId); 
    post.likes += 1; 
    await post.save();
    return res.status(200).json({
        message: 'Post liked successfully!',
        post
    });
    
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });  
    }
}


export const dislikepost=async(req,res,next)=>{
    const { postId } = req.params; 
    const userId=req.body.userId;
    try {
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: 'Post not found!' });
           }  
           if(post.dislikedBy.includes(userId))
            {
         return res.status(400).json({ message: 'You have already disliked this post!' });   
            }
            if (post.likedBy.includes(userId)) {
                post.ikedBy.pull(userId); 
                post.likes -= 1;         
            }
            post.dislikedBy.push(userId); 
            post.dislikes += 1;      
            await post.save();
            return res.status(200).json({
                message: 'Post disliked successfully!',
                post
            });    
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });      
    }
}


export const likedordislikepostlisting=async(req,res,next)=>{
    const { postId } = req.params; 
    try {
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: 'Post not found!' });
           }  
           return res.status(200).json({
            post
        }); 
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });         
    }
}


export const allpostlisting=async(req,res,next)=>{
    try {
        const posts = await Post.find();
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found!' });
        }
        return res.status(200).json({
            message: 'Posts successfully retrieved!',
            posts,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });    
    }
}


export const relatedpost=async(req,res,next)=>{
    const { postId } = req.params; 
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' });
        }
        const related = await Post.find({
            categories: { $in: post.categories }, 
            _id: { $ne: postId } 
        }).limit(10);

        return res.status(200).json({
            message: 'Related posts successfully retrieved!',
            relatedPosts: related, 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });  
    }
}


export const postbyuserid=async(req,res,next)=>{
    const userId=req.params;
    try {
        const post=await Post.find({author:userId})
        if (!post) {
            return res.status(404).json({ message: 'Post not found!' });
        }
        return res.status(200).json({
            message: 'Related posts successfully retrieved!',
            postbyuserid: post 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });      
    } 
}