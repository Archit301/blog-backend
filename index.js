import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv';
import cors from "cors"
import path from"path"
import commentRouter from "./routes/comment_routes.js"
import postRouter from "./routes/post_routes.js"
import authRouter from "./routes/auth_routes.js"
import cookieParser from "cookie-parser";

  dotenv.config();
const PORT=process.env.PORT||3001
const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
mongoose
   .connect(process.env.MONGO)
   .then(()=>{
console.log("Connected to MongoDB!");
})
.catch((err)=>{
    console.log(err);
})
app.use("/backend/auth",authRouter);
app.use("/backend/post",postRouter);
app.use("/backend/comment",commentRouter)
// app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// })

app.listen(PORT,()=>{
    console.log(`Server is runnnig on ${PORT}`)
})