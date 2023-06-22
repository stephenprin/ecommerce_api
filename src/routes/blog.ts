import express from 'express';
import { createBlog , getAllBlogs, updateBlog, getBlog,deleteBlog} from '../controller/blogController';
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";
const router = express.Router();

router.post('/create', auth, requestAuth, isAdmin, createBlog);
router.get('/all-blog', auth, requestAuth, isAdmin, getAllBlogs);
router.put('/update/:id', auth, requestAuth, isAdmin, updateBlog);
router.get("/get-blog/:id", getBlog)
router.delete("/delete/:id",auth, requestAuth, isAdmin, deleteBlog)



export default router;