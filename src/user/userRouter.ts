import expres from 'express'
import { createUser, login } from './userController'
import userValidate from './userValidate'
import { createUserSchema, loginUserSchema, } from './userValidater'

const userRouter = expres.Router()

userRouter.post('/register',userValidate(createUserSchema),createUser)
userRouter.post('/login',userValidate(loginUserSchema),login)

export default userRouter