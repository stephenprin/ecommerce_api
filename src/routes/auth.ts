import express from "express";
import { register,getAllUser, login ,logout} from "../controller/userController";
import {}  from "../controller/userController";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/get-all", getAllUser)
router.post("/logout", logout)

export default router;

