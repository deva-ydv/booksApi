import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'


const createUser = async (req: Request, res: Response, next: NextFunction) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        const error = createHttpError(400,"All fields are required")
        return next(error)
    }

    const user = await userModel.findOne({email: email})

    if(user){
        const err = createHttpError(400,'User already exist with this email')
        return next(err)
    }

    const hashedPassword = await bcrypt.hash(password,10)

    res.json({msg: "sdljfkkkkkkkkkkk"})
}

export{createUser}