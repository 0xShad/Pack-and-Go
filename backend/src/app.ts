import express from "express";
import helmet from "helmet";
import { PORT } from "./config/config";
import connectToDatabase from "./database/db";
import authRouter from "./routes/auth.routes";
import errorMiddleware from "./middleware/middleware";
import tourRouter from "./routes/tour.routes";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "50mb" }));
console.log("CORS middleware running");

// Routes
app.use("/auth", authRouter);
app.use("/tour", tourRouter);

// global error middleware
app.use(errorMiddleware);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to Pack & Go API");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectToDatabase();
});
