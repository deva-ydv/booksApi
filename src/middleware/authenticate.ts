
import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { config } from "../config/config";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")

    if(!token) return next(createHttpError(401,"Authorization required"));

    const parsedToken = token.split(' ')[1];

    try{
        const decoded = jwt.verify(parsedToken,config.jwtSecret as string)
        const _req = req as AuthRequest;  // interface part of typescript
        _req.userId = decoded.sub as string;
        next();
    }catch(err){
        return next(createHttpError(401,'Token expired'))
    }
    
}