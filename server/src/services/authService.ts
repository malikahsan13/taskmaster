import bcrypt from "bcrypt"
import { User } from "../models/user"
import { IUser } from "../types/user"
import { generateToken } from "../utils/jwt"

export const registerUser = async (data: IUser) => {
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({name, email, password: hashedPassword})
    return User.findById(user._id).select("-password")
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({email})

    if(!user) throw new Error("Invalid credentials!")

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error("Invalid credentials")

    const token = generateToken({userId: user._id.toString(), email: user.email})

    return token
}

export const getUserById = async (userId: string) => {
    return await User.findById(userId).select("-password")
}