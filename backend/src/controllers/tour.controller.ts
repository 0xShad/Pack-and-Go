import { NextFunction, Request, Response } from "express";



export const getAllTours = (req: Request, res: Response, next: NextFunction) => {
    try {

        res.status(202).json({
            message: 'Get all tours endpoint'
        })

    } catch (error) {
        next(error)
    }
}