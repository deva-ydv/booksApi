import express from 'express'
import globalErrorHandler from './middleware/globalErrorHandler'
const app = express()

app.get('/',(req,res)=>{
    res.send("sjdkl")
})


app.use(globalErrorHandler)


export default app