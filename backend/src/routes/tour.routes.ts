import { Router } from "express";
import {
  createTour,
  getAllTours,
  joinTour,
  unJoinATour,
} from "../controllers/tour.controller";
import authorize from "../middleware/auth.middleware";

const tourRouter = Router();

tourRouter.get("/", authorize, getAllTours);
tourRouter.post("/create-tour", authorize, createTour);
tourRouter.put("/join-tour/:id", authorize, joinTour);
tourRouter.put("unjoin-tour/:id", authorize, unJoinATour);

export default tourRouter;
