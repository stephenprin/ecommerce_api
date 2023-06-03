import { Request, Response } from "express";
import Product from "../model/productModel";
import expressAsyncHandler from 'express-async-handler';

const createProduct = expressAsyncHandler(async (req: Request, res: Response) => { 
    try {
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


export { createProduct }