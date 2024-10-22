import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true," title is required"],
        maxlength:[100,"title must be less than 100"]
    },
    content:{
        type:String,
        required:[true," content is required"],
        maxlength:[1000,"content must be less than 1000"]  
    },
     avatar:{
        type:[String],
        required:[true," avatar is required"],
        validate: [arrayLimit, "Avatar array must be less than 7 items"]
     },
     author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true," author is required"],
     },
     Comment:[{
        type:mongoose.Types.ObjectId,
        ref:"Comment",
     }],
     likes: {
        type: Number,
        default: 0  
    },
    likedBy: [{  
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    dislikes: {
        type: Number,
        default: 0  
    },
    dislikedBy: [{  
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    categories: {
        type: [String], 
        required: [true, "Categories are required"],
        enum: ["Tech", "Lifestyle", "Travel", "Education", "Entertainment", "News"], 
     },
     tags: [{
        type: String,  
        maxlength: [50, "Tag cannot be longer than 50 characters"]
    }]
},{ timestamps: true})


function arrayLimit(val) {
    return val.length <= 7;
}



export const Post=mongoose.model("Post",PostSchema)