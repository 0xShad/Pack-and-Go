import mongoose from "mongoose";
import { UserDocumentModel } from "../validators/IUser";



const userSchema = new mongoose.Schema<UserDocumentModel>({
    username: {
        type: String,
        trim: true,
        minLength: 3,
        unique: true
    },

    firstName: {
        type: String,
        trim: true,
        minLength: 2,
        required: [true, 'Firstname is required'],
        maxLength: 20
    },

    lastName: {
        type: String,
        trim: true,
        minLength: 2,
        required: [true, 'Lastname is required'],
        maxLength: 20
    },
    
    email: {
        type: String,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        unique: true,
        lowercase: true
    },
    
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: 6
    }
}, {timestamps: true})

export const User = mongoose.model<UserDocumentModel>('User', userSchema)