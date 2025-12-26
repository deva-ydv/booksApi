import expres from 'express'
import { createUser } from './userController'
import userValidate from './userValidate'
import { createUserSchema } from './userValidater'

const userRouter = expres.Router()

userRouter.post('/register',userValidate(createUserSchema),createUser)

export default userRouter