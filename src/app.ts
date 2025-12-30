import express from 'express'
import globalErrorHandler from './middleware/globalErrorHandler'
import userRouter from './user/userRouter'
import bookRouter from './books/bookRouter'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users',userRouter)
app.use('/api/books',bookRouter)

app.use(globalErrorHandler)

export default app