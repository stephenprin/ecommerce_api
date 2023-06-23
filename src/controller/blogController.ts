import  { Request, Response } from "express";
import mongoose from "mongoose";
import Blog from "../model/blogModel";
import User from "../model/userModel";
import expressAsyncHandler from 'express-async-handler';
import validateMongooseId from "../utils/validateMongoseId";


const createBlog = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({
            message: "Blog created successfully",
            data: blog
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }

});

 const getAllBlogs = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {

        const blogs = await Blog.find();
        res.status(200).json({
            message: "All blogs",
            data: blogs
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
 });


const updateBlog = expressAsyncHandler(async (req: Request, res: Response) => { 
    const id = req.params.id;
    try {

        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: "Blog updated successfully",
            data: updateBlog
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});
const getBlog = expressAsyncHandler(async (req: Request, res: Response) => { 
    const id = req.params.id;
    try {

        const blog = await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1},
        },
            {new:true}
            
        )

        res.status(200).json({
            message: "Blog get successfully",
            data: blog
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal service error",
            error
        })
        
    }
});

const deleteBlog = expressAsyncHandler(async (req: Request, res: Response) => { 
    const id = req.params.id;
    try {

        const blog = await Blog.findByIdAndDelete(id);
       
        res.status(200).json({
            message: "Blog deleted successfully",
            data: blog
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});

const likedBlog = expressAsyncHandler(async (req: Request, res: Response) => {
    const { blogId } = req.body;
    validateMongooseId(blogId)
    const blog = await Blog.findById(blogId);
   
    const userLoginId = req.user?.id;
    const isLikes = blog?.isLiked;
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === userLoginId?.toString())
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: userLoginId },
            isDisliked:false,
        }, { new: true });
        res.status(200).json({
            message: "Blog disliked successfully",
            data: blog
        });
    }
    if (isLikes) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: userLoginId },
            isLiked:false
        }, { new: true });
        res.status(200).json({
            message: "Blog unLiked successfully",
            data: blog
        });
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: userLoginId },
            isLiked:true
        }, { new: true });
        res.status(200).json({
            message: "Blog liked successfully",
            data: blog
        });
    }
   
   
})

const disLikedBlog = expressAsyncHandler(async (req: Request, res: Response) => {
    const { blogId } = req.body;
    validateMongooseId(blogId)
    const blog = await Blog.findById(blogId);
   
    const userLoginId = req.user?.id;
    const isDisliked = blog?.isDisliked;
    const alreadyLiked = blog?.likes?.find((userId) => userId?.toString() === userLoginId?.toString())
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: userLoginId },
            isLiked:false,
        }, { new: true });
        res.status(200).json({
            message: "Blog liked successfully",
            data: blog
        });
    }
    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: userLoginId },
            isDisliked:false
        }, { new: true });
        res.status(200).json({
            message: "Blog unDisliked successfully",
            data: blog
        });
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: userLoginId },
            isDisliked:true
        }, { new: true });
        res.status(200).json({
            message: "Blog Disliked successfully",
            data: blog
        });
    }
   
   
})
 export { createBlog, getAllBlogs,updateBlog, getBlog, deleteBlog, likedBlog, disLikedBlog  }


