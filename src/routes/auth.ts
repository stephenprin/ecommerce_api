import express from "express";
import { register } from "../controller/userController";
import {login}  from "../controller/userController";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

export default router;

