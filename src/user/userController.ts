import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required."));
  }

  try {
    // DB call to check user is there?
    const user = await userModel.findOne({ email });

    if (user) {
      return next(createHttpError(400, "User already exists with this email."));
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB call to create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // JWT signing 
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: "7d" });
    res.status(201).json({ accessToken: token });
  } catch (error) {
   return next(createHttpError(500, "Failed to create user."));
  }
};





const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  if(!email || !password){
    return next(createHttpError(400, "All fields are required."));
  }
  try {
    const user = await userModel.findOne({email: email})

    if(!user){
      return next(createHttpError(401,'user not found.'))
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch) return next(createHttpError(401,'username or password is incorrect!'))

    const token = sign({ sub: user._id }, config.jwtSecret as string, { expiresIn: "7d" });
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Failed to login."));
  } 
}

export { createUser, login };
