import { z } from "zod"

export const SignInZodSchema = z.object({
    email: z .string().toLowerCase().email(),
    password: z .string().min(6)
})