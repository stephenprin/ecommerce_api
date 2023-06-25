import { Request, Response } from "express";
import Brand from "../model/brandModel";
import expressAsyncHandler from 'express-async-handler';
import validateMongooseId from "../utils/validateMongoseId";


const createBrand = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const brand = await Brand.create(req.body)
        res.status(201).json({
            message: "Brand created  successfully",
            data: brand
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})

const updateBrand = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id)
        validateMongooseId(id)
        const brand = await Brand.findByIdAndUpdate(id, req.body,{new:true})
        res.status(201).json({
            message: "Brand updated  successfully",
            data: brand
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})
const deleteBrand = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(id)
        validateMongooseId(id)
        const brand = await Brand.findByIdAndDelete(id, {new:true})
        res.status(201).json({
            message: "Brand delete  successfully",
            data: brand
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})
const getAllBrand = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const brand = await Brand.find();
        res.status(201).json({
            message: "All categories",
            data: brand
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})
const getBrand = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        validateMongooseId(id)
        const brand = await Brand.findById(id);
        res.status(201).json({
            message: "successfully",
            data: brand
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error: error
        })
        
    }
})

 
export { createBrand, updateBrand, deleteBrand, getAllBrand,getBrand }

