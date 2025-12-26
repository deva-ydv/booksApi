import { Request, Response, NextFunction } from "express";


const createUser = async (req: Request, res: Response, next: NextFunction) =>{
    res.json({msg: "conntrol"})
}

export{createUser}