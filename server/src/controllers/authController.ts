import { Request, Response } from "express"
import { registerUser, loginUser, getUserById } from "../services/authService"
import { sendMail } from "../utils/mailer";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId: string, role: string) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  };
  
  const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
  };

export const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password, role = 'user'} = req.body
        const user = await registerUser({name, email, password, role})
        await sendMail(
            email,
            "Welcome to Our App 🎉",
            `<h1>Hello, ${name}</h1><p>Thanks for registering!</p>`
          );
        res.status(201).json(user)
    }catch(error : any){
        res.status(500).json({message: error.message || "Server error"})
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const token = await loginUser(email, password)
        res.status(200).json({token})
    }catch(error : any){
        res.status(500).json({message: error.message || "Server error"})
    }
}

export const getMe = async (req: Request, res: Response) => {
    try{
        const user = await getUserById(req.user.userId)
        res.status(200).json(user)
    }catch(error : any){
        res.status(500).json({message: error.message || "Server error"})
    }
}

export const refreshToken = (req: Request, res: Response) => {
    const token = req.cookies.refresh_token;
    if (!token) return res.sendStatus(401);
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
      const accessToken = generateAccessToken(decoded.id, decoded.role);
      res.status(200).json({ accessToken });
    } catch (err) {
      res.sendStatus(403);
    }
  };
