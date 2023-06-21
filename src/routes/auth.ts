import express from "express";
import {
    register,
    getAllUser, deleteUser,
    login, logout,
    getUserById,
    updateUser,
    unBlockUser,
    blockUser, refreshToken,
    updatePassword,
    forgotPasswordToken
    
} from "../controller/userController";
import { auth, isAdmin } from "../middlewares/authMiddleware";
import {requestAuth} from "../middlewares/requestAuth";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post('/forgot-password',  forgotPasswordToken)
router.get("/get-all-user",auth,requestAuth,isAdmin, getAllUser)
router.post("/logout", logout)
router.get("/get-user/:id",auth,requestAuth, getUserById)
router.delete("/delete-user/:id" ,auth,requestAuth,deleteUser) 
router.put("/update-user/:id", auth, requestAuth, updateUser)
router.put("/block-user/:id" ,auth,requestAuth, isAdmin, blockUser) 
router.put("/unblock-user/:id", auth, requestAuth, isAdmin, unBlockUser)
router.get("/refresh-token", refreshToken)
router.put("/password", auth, requestAuth, updatePassword)

export default router;

