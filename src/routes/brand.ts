import express from 'express';
import { createBrand, updateBrand, deleteBrand,getAllBrand, getBrand } from '../controller/brandController';
const router = express.Router();
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";


router.post("/", auth, requestAuth, isAdmin, createBrand)
router.put("/update/:id", auth, requestAuth, isAdmin, updateBrand)
router.delete("/delete/:id", auth, requestAuth, isAdmin, deleteBrand)
router.get("/get-all", auth, requestAuth, isAdmin, getAllBrand)
router.get("/get-one/:id", auth, requestAuth, isAdmin, getBrand)



export default router;