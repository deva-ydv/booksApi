import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () =>{
    try {
        mongoose.connection.on('connected',() =>{
            // this on event is give by mongoose, once we connected this on callback gets called
            console.log("Database connected successfully")
        })

        mongoose.connection.on('error', (err)=>{
            // this error is for after connection, because below catch(err) runs only once initailly...
            console.log('error in connected database',err)
        })
        await mongoose.connect(config.databaseUrl as string); // typecast the url as string due to TS
        
    } catch (error) {
        console.error("failed in connection",error)
        process.exit(1) // this helps to stop the server, because if db is not connected then what's the need of server
    }
}


export default connectDB