import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Tour from "../models/tour.model";



export const getAllTours = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const tours = await Tour.findById({user: userId})
        res.json(tours)
    } catch (error) {
        next(error)
    }
}