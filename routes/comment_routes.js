import express from "express"
import {createcomment,getcommentbypost,deletecomment,likedcomment,repliescomment} from "../controllers/comment_controller.js"
import {isAuthenticated}   from "../utils/auth_utils.js"
import {isAdminorAuthor}   from "../utils/role_utils.js"
const router=express.Router()


router.post('/createcommnet',isAuthenticated,createcomment)
router.get('/fetchcomment/:postId',isAuthenticated,getcommentbypost)
router.delete('/comment/:userId', isAuthenticated, isAdminorAuthor,deletecomment);
router.get('/fetchlikecomment/:commentId',isAuthenticated,likedcomment)
router.post('/repliescomment/:commentId',isAuthenticated,repliescomment)
export default router;