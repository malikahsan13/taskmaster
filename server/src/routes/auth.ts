import express from "express"
import bcrypt from "bcrypt"
import { auth } from "../middleware/auth"
import { register, login, getMe } from "../controllers/authController"
import { validateRequest } from "../middleware/validate"
import { RegisterDto, LoginDto } from "../dto/auth.dto"
import crypto from "crypto";
import { sendMail } from "../utils/mailer";
import { User } from "../models/user"

const router = express.Router()

router.post("/register", validateRequest(RegisterDto), register)
router.post("/login", validateRequest(LoginDto), login)
router.get("/me", auth, getMe)
router.post("/refresh", refreshToken);
router.post("/logout", logout);

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
  
  router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });
  
    if (!user) return res.status(400).json({ message: "Token expired or invalid" });
  
    user.password = password; // hash before save in real implementation
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
  
    await user.save();
  
    res.json({ message: "Password updated successfully" });
  });
  
  router.post("/refresh-token", (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      const accessToken = generateAccessToken({ id: payload.id, email: payload.email });
      res.json({ accessToken });
    } catch {
      res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  });

export default router;