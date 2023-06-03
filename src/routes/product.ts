import express from 'express';
const router = express.Router();
// getAllProducts, getProductById, updateProduct, deleteProduct, getProductsBySlug
import { createProduct,  } from '../controller/productController'

router.post('/create', createProduct);

export default router;