import express from "express"
import { dislikepost,Addpost,deletepost, allpostlisting,postbyuserid,relatedpost,likepost,likedordislikepostlisting,updatePost } from "../controllers/post_controller.js";
import {isAuthenticated}   from "../utils/auth_utils.js"
import {isAdminorAuthor,isAdmin}   from "../utils/role_utils.js"
const router=express.Router();
router.post('/posts', isAuthenticated, isAdmin, Addpost);
router.put('/posts/:id', isAuthenticated, isAdminorAuthor,updatePost);
router.delete('/posts/:id', isAuthenticated, isAdminorAuthor,deletepost);
router.get('/posts', isAuthenticated, allpostlisting);
router.get('/posts/:userId', isAuthenticated, postbyuserid);
router.get('/relatedposts/:userId', isAuthenticated, relatedpost);
router.post('/likepost/:postId', isAuthenticated, likepost);
router.post('/dislikepost/:postId', isAuthenticated, dislikepost);
router.get('/likepostfetch/:postId', isAuthenticated, likedordislikepostlisting);
export default router;