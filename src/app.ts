import express from 'express'
import globalErrorHandler from './middleware/globalErrorHandler'
import userRouter from './user/userRouter'
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("sjdkl")
})


app.use('/api/users',userRouter)

app.use(globalErrorHandler)


export default app