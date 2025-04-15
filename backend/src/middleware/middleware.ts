import { ErrorRequestHandler, NextFunction, Request, Response } from "express"



const errorMiddleware: ErrorRequestHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    try {
        let error: any = {...err}
        error.message = err.message
        console.log(err)

        if (err.name === 'CastError') {
            const message = 'Resource not found'
            error = new Error(message)
            error.statusCode = 404
        }

        if (err.code === 11000) {
            const message = 'Duplicate value field entered'
            error = new Error(message)
            error.statusCode = 404
        }


        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Server error'
        })

    } catch (error) {
        next(error)
    }

}

export default errorMiddleware