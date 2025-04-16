import { Router } from "express";
import {
  createTour,
  getAllTours,
  joinTour,
} from "../controllers/tour.controller";
import authorize from "../middleware/auth.middleware";

const tourRouter = Router();

tourRouter.get("/", authorize, getAllTours);
tourRouter.post("/create-tour", authorize, createTour);
tourRouter.put("/join-tour/:id", authorize, joinTour);

export default tourRouter;
