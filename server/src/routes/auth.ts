import express from "express"
import bcrypt from "bcrypt"
import { auth } from "../middleware/auth"
import { register, login, getMe } from "../controllers/authController"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, getMe)

export default router;