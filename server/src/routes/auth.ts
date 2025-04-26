import express from "express"
import bcrypt from "bcrypt"
import { auth } from "../middleware/auth"
import { register, login, getMe } from "../controllers/authController"
import { validateRequest } from "../middleware/validate"
import { RegisterDto, LoginDto } from "../dto/auth.dto"

const router = express.Router()

router.post("/register", validateRequest(RegisterDto), register)
router.post("/login", validateRequest(LoginDto), login)
router.get("/me", auth, getMe)

export default router;