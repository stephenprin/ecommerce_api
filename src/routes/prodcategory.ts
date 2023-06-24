import express from 'express';
import { createCategory, updateCategory, deleteCategory } from '../controller/prodCategoryController';
const router = express.Router();
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";


router.post("/", auth, requestAuth, isAdmin, createCategory)
router.put("/update/:id", auth, requestAuth, isAdmin, updateCategory)
router.delete("/delete/:id", auth, requestAuth, isAdmin, deleteCategory)



export default router;