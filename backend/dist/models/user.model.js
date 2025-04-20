"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
