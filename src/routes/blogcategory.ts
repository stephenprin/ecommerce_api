import express from 'express';
import { createCategory, updateCategory, deleteCategory,getAllCategory, getCategory } from '../controller/blogCategoryController';
const router = express.Router();
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";


router.post("/", auth, requestAuth, isAdmin, createCategory)
router.put("/update/:id", auth, requestAuth, isAdmin, updateCategory)
router.delete("/delete/:id", auth, requestAuth, isAdmin, deleteCategory)
router.get("/get-all", auth, requestAuth, isAdmin, getAllCategory)
router.get("/get-one/:id", auth, requestAuth, isAdmin, getCategory)



export default router;