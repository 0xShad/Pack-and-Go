import { Router } from "express"
import { getAllTours } from "../controllers/tour.controller"


const tourRouter = Router()


tourRouter.get('/', getAllTours)


export default tourRouter