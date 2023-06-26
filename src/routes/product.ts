import express from 'express';
const router = express.Router();
// getAllProducts, getProductById, updateProduct, deleteProduct, getProductsBySlug
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, addToWishList } from '../controller/productController';
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";

router.post('/create', auth,requestAuth, isAdmin,createProduct);
router.get('/all-product', auth,requestAuth, isAdmin, getAllProducts);
router.get('/:id', auth,requestAuth, isAdmin, getProductById);
router.put('/update/:id',auth,requestAuth, isAdmin, updateProduct);
router.delete('/delete/:id', auth, requestAuth, isAdmin, deleteProduct); 
router.put('/wishlist', auth,requestAuth,addToWishList)

export default router;