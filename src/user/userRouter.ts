import expres from 'express'
import { createUser } from './userController'

const userRouter = expres.Router()

userRouter.post('/register',createUser)

export default userRouter