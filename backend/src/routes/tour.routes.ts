import { Router } from "express"
import { createTour, getAllTours } from "../controllers/tour.controller"
import authorize from "../middleware/auth.middleware"


const tourRouter = Router()


tourRouter.get('/',authorize, getAllTours)
tourRouter.post('/create-tour', authorize, createTour)

export default tourRouter