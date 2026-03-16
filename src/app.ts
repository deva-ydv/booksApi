import express from 'express'
import cors from 'cors'
import path from 'path';
import globalErrorHandler from './middleware/globalErrorHandler'
import userRouter from './user/userRouter'
import bookRouter from './books/bookRouter'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(process.cwd(), 'public')));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });
app.get('/', (req, res) => {
  // process.cwd() is the root of your project
  const indexPath = path.join(process.cwd(), 'public', 'index.html');
  res.sendFile(indexPath);
});

// routes
app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

// error handler
app.use(globalErrorHandler)

export default app