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
        //filtering
        const queryObject = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObject[el]);
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        //sorting   
        if (req.query.sort) {
            const sortBy = req.query.sort as string;
            sortBy.split(',').join(' ');
            query = query.sort(sortBy);
        } else { 
            query = query.sort('-createdAt');
        }

        //field limiting
        if (req.query.fields) { 
            const fields = req.query.fields as string;
            fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }
        //pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numProducts = await Product.countDocuments();
            if (skip >= numProducts) throw new Error('This page does not exist');
        }
        const products = await query;
        res.status(200).json({
            message: `Paginated products (Page: ${page}, Limit: ${limit})`,
  data: products,
        });
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