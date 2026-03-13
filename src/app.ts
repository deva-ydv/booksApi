import express from 'express'
import cors from 'cors'
import path from 'path';
import globalErrorHandler from './middleware/globalErrorHandler'
import userRouter from './user/userRouter'
import bookRouter from './books/bookRouter'

const app = express()

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// routes
app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

// error handler
app.use(globalErrorHandler)

export default app