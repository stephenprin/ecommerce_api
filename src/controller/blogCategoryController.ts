import { Request, Response } from "express";
import BlogCategory from "../model/blogCategoryModel";
import expressAsyncHandler from 'express-async-handler';
import validateMongooseId from "../utils/validateMongoseId";


const createCategory = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const category = await BlogCategory.create(req.body)
        res.status(201).json({
            message: "Category created  successfully",
            data: category
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})

const updateCategory = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id)
        validateMongooseId(id)
        const category = await BlogCategory.findByIdAndUpdate(id, req.body,{new:true})
        res.status(201).json({
            message: "Category updated  successfully",
            data: category
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})
const deleteCategory = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id)
        validateMongooseId(id)
        const category = await BlogCategory.findByIdAndDelete(id, {new:true})
        res.status(201).json({
            message: "Category delete  successfully",
            data: category
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})
const getAllCategory = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const category = await BlogCategory.find();
        res.status(201).json({
            message: "All categories",
            data: category
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})
const getCategory = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        validateMongooseId(id)
        const category = await BlogCategory.findById(id);
        res.status(201).json({
            message: "successfully",
            data: category
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})

 
export { createCategory, updateCategory, deleteCategory, getAllCategory,getCategory }

