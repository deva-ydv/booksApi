import mongoose from "mongoose";
import { User } from "./userTypes"; // typescript part

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

},{
    timestamps: true // this adds two new fields in database-> createdAt, updatedAt which can be helpful...
})


export default mongoose.model<User>('User', userSchema)