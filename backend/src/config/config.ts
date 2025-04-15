import { config } from "dotenv"

config({path: '.env.development'})

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

if (!process.env.DB_URI) {
    throw new Error('DB_URI is not defined')
}

if (!process.env.PORT) {
    throw new Error('PORT is not defined')
}

export const PORT = process.env.PORT!
export const JWT_SECRET = process.env.JWT_SECRET as string
export const DB_URI = process.env.DB_URI!