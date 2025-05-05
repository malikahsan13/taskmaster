import { Request, Response } from "express"
import { registerUser, loginUser, getUserById } from "../services/authService"
import { sendMail } from "../utils/mailer";

export const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body
        const user = await registerUser({name, email, password})
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
