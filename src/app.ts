import express from 'express'
import cors from 'cors'

import globalErrorHandler from './middleware/globalErrorHandler'
import userRouter from './user/userRouter'
import bookRouter from './books/bookRouter'

const app = express()

app.use(express.json())
app.use(cors())

// health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// routes
app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

// error handler
app.use(globalErrorHandler)

export default app