import express from "express";
import {
    register,
    getAllUser, deleteUser,
    login, logout, getUserById,updateUser
} from "../controller/userController";
import { auth } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/get-all-user",auth,requestAuth, getAllUser)
router.post("/logout", logout)
router.get("/get-user/:id", getUserById)
router.delete("/ /:id", deleteUser) 
router.put("/update-user/:id", updateUser)

export default router;

