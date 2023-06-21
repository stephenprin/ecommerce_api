import express from 'express';
import { createBlog , getAllBlogs, updateBlog} from '../controller/blogController';
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";
const router = express.Router();

router.post('/create', auth, requestAuth, isAdmin, createBlog);
router.get('/all-blog', auth, requestAuth, isAdmin, getAllBlogs);
router.put('/update/:id', auth, requestAuth, isAdmin, updateBlog);



export default router;