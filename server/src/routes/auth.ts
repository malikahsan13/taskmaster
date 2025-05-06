import express from "express"
import bcrypt from "bcrypt"
import { auth } from "../middleware/auth"
import { register, login, getMe } from "../controllers/authController"
import { validateRequest } from "../middleware/validate"
import { RegisterDto, LoginDto } from "../dto/auth.dto"
import crypto from "crypto";
import { sendMail } from "../utils/mailer";

const router = express.Router()

router.post("/register", validateRequest(RegisterDto), register)
router.post("/login", validateRequest(LoginDto), login)
router.get("/me", auth, getMe)
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });
  
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
  
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendMail(
      user.email,
      "Reset your password",
      `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    );
  
    res.json({ message: "Reset email sent" });
  });
  
  

export default router;