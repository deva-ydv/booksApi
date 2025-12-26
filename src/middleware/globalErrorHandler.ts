import express,{NextFunction, Request, Response} from 'express'
import createHttpError, { HttpError } from 'http-errors'
import { config } from '../config/config'

const globalErrorHandler = ((err:HttpError, req:Request, res:Response, next:NextFunction) =>{
    const StatusCode = err.StatusCode || 500
    return res.status(StatusCode).json({
        message: err.message,
        errorStack: config.env === 'development' ? err.stack : "" // NOT FOR PRODUCTION only for development
    })
})

export default globalErrorHandler