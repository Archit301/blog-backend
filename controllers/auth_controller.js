import { User } from "../models/user_model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const signin=async(req,res,next)=>{
    const {username,email,password,role}=req.body;
    console.log(req.body)
    try {
        const userExists = await User.findOne({
            $or: [{ username }, { email }]
         });
         if (userExists) {
            if (userExists.username === username) {
               return res.status(409).json({ message: 'Username already exists!' });
            }
            if (userExists.email === email) {
               return res.status(409).json({ message: 'Email already exists!' });
            }
         }
        if(role==="Admin")
        {
            return res.status(403).json({ message: "Please try another role you can't be admin !"}); 
            } 
            const hashpassword = await bcryptjs.hash(password, 10);
       const newuser=new User({username,email,password:hashpassword})
      await  newuser.save();
      console.log(newuser)
      return res.status(201).json({ 
        message: 'User successfully created!', 
        user: { username, email, role }
    });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
              message: "Validation failed",
              errors: error.errors,
            });
          }
        return res.status(500).json({ message: 'Server error !' });
    }
}


export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const user = await User.findOne({ email });
       if (!user) {
            return res.status(404).json({ message: 'Email does not exist!' });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });   
    }
}


export const signout=async(req,res,next)=>{
try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out!');
} catch (error) {
    return res.status(500).json({ message: 'Server error!', error: error.message });    
}
}


export const google=async(req,res,next)=>{
    try {
       const user=await User.findOne({email:req.body.email})
      if(user){
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); 
        const { password: pass, ...rest } = validUser._doc;
       return  res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
      }
      else{
        const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
            username:
              req.body.name.split(' ').join('').toLowerCase() +
              Math.random().toString(36).slice(-4),
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.photo,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password: pass, ...rest } = newUser._doc;
          res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
      }
    } catch (error) {
        return res.status(500).json({ message: 'Server error!', error: error.message });      
    }
}