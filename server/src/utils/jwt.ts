import jwt from "jsonwebtoken"
import { JwtPayload } from "../types/user"

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1h"})
}

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
  };