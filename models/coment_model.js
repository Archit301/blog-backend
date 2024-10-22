import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Content is required"],
        maxlength: [500, "Content must be less than 500 characters"]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"]
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"]
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true 
});

export const Comment = mongoose.model("Comment", CommentSchema);