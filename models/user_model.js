import mongoose from "mongoose";
import validator from 'validator';
const { isEmail } = validator;
const UserSchema=new mongoose.Schema({
   username:{
    type:String,
    required:[true,"Username is required"],
    unique:true,
    trim:true,
    minlength:[3,"Username must be at least 3 characters long"],
    maxlength:[30,"Username cannot be more than 30 characters long"]
   },
   email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
    validate:[isEmail,"Please provide a valid email address"]
   },
   password:{
    type:String,
    required:[true,"Password is required"],
    minlength:[8,"Password must be greater than 8"],
    select:false
   },
   role:{
    type:String,
    enum:['User','Author','Admin'],
    default:'User'
   },
   avatar: {
    type: String,
    default: 'default.jpg' 
 },
 passwordChangedAt: {
   type: Date // Corrected field type to Date for password change tracking
 },
 resetPasswordToken: String,
   resetPasswordExpires: Date

},{timestamps:true})


export const User=mongoose.model("User",UserSchema)

