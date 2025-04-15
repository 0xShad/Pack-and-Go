import express from "express"
import helmet from "helmet"
import { PORT } from "./config/config"
import connectToDatabase from "./database/db"
import authRouter from "./routes/auth.routes"
import errorMiddleware from "./middleware/middleware"
import tourRouter from "./routes/tour.routes"

const app = express()


// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(express.json())

// Routes
app.use('/auth', authRouter)
app.use('/tour', tourRouter)


// global error middleware
app.use(errorMiddleware)

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Welcome to Pack & Go API')
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: 8080`)
    connectToDatabase()
})

