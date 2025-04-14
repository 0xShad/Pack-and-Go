import { Router } from "express"
import { signIn, signUp } from "../controllers/auth.controller"

const authRouter = Router()

authRouter.post('/sign-in', signIn)
authRouter.post('/sign-up', signUp)


export default authRouter