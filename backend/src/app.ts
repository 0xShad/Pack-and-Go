import express from "express"
import helmet from "helmet"
import { PORT } from "./config/config"
import connectToDatabase from "./database/db"

const app = express()


// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(express.json())

// Routes
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Welcome to Pack & Go API')
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: 8080`)
    connectToDatabase()
})

