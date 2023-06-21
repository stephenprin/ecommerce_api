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
        
    }
});
 export { createBlog, getAllBlogs,updateBlog }


