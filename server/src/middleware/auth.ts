import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

interface JwtPayload{
    userId: string;
    email: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ','');


    if(!token){
        res.status(401).json({message:"No token, authorization denied"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        (req as any).user = decoded;
        next();
    }catch(err){
        console.error(err)
        res.status(401).json({message: "Token is not valid"})
    }
}