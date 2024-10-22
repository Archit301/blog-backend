import jwt from "jsonwebtoken"
import { User } from "../models/user_model.js"


export const isAuthenticated=async(req,res,next)=>{
    const token=req.header('Authorization')?.replace('Bearer ','');
    if(!token)
   return res.status(401).json({ message: 'Authentication failed: No token provided' });
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findbyId(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
         }
      req.user=user;
      next()
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
}