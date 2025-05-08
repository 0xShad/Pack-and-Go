import { Router } from "express";
import {
  createTour,
  deleteAtour,
  getAllTours,
  getUserTours,
  joinTour,
  unJoinATour,
} from "../controllers/tour.controller";
import authorize from "../middleware/auth.middleware";

const tourRouter = Router();

tourRouter.get("/get-user-tours", authorize, getUserTours);
tourRouter.get("/", getAllTours)
tourRouter.post("/create-tour", authorize, createTour);
tourRouter.put("/join-tour/:id", authorize, joinTour);
tourRouter.put("/unjoin-tour/:id", authorize, unJoinATour);
tourRouter.delete("/delete-tour/:id", authorize, deleteAtour)

export default tourRouter;
