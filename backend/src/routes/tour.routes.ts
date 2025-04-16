import { Router } from "express"
import { getAllTours } from "../controllers/tour.controller"
import authorize from "../middleware/auth.middleware"


const tourRouter = Router()


tourRouter.get('/',authorize, getAllTours)


export default tourRouter