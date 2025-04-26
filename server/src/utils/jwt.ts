import jwt from "jsonwebtoken"
import { JwtPayload } from "../types/user"

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1h"})
}
