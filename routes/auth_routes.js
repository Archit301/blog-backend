import express from "express"
import { signin,login,google,signout } from "../controllers/auth_controller.js";
import {isAuthenticated}   from "../utils/auth_utils.js"


const router=express.Router();
router.post('/signin',signin)
router.post('/login',login)
router.post('/google',google)
router.post('/signout',isAuthenticated,signout)
export default router;