import {  z } from "zod"


export const UserRequestSchema = z.object({
    username: z .string().min(3),
    firstName: z .string().min(2),
    lastName: z .string().min(2),
    email: z .string().email().toLowerCase(),
    password: z .string().min(6)

})