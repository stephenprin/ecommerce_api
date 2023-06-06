import { Request, Response } from "express";
import Product from "../model/productModel";
import expressAsyncHandler from 'express-async-handler';
import slugify from "slugify";

const createProduct = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true,
                trim: true
            })
        }
        const product = await Product.create(req.body);
    res.status(201).json({
        message: "Product created successfully",
        data: product
    });
    
   } catch (error) {
         res.status(500).json({
             message: "Failed to create product",
                error: error
         })
   }
});

const getAllProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: "All products",
            data: products
        })
    } catch (error) {
        res.status(404).json({
            message: "Products not found",
            error
        })
    }
})
 
const getProductById = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json({
            message: "Product found",
            data: product
        })
    } catch (error) {
        res.status(404).json({
            message: "Product not found",
            error
        })
    }
})
 
const updateProduct = expressAsyncHandler(async (req: Request, res: Response) => { 
    if(req.body.title){
        req.body.slug = slugify(req.body.title, {
            lower: true,
            trim: true
        })
    }
    const { id } = req.params;
    try { 
        const productupdate = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: "Product updated successfully",
            data: productupdate
        });
    } catch (error) { 
        res.status(404).json({
            message: "Product not found",
            error
        })
    }
})

const deleteProduct = expressAsyncHandler(async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "Product deleted successfully",
            data: product
        })
    } catch (error) {
        res.status(404).json({
            message: "Product not found",
            error
        })
    }
});
export { createProduct,getAllProducts ,getProductById, updateProduct, deleteProduct}