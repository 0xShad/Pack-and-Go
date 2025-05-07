import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorMiddleware: ErrorRequestHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let error: any = { ...err };
    error.message = err.message;
    console.log(err);

    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = "Duplicate value field entered";
      error = new Error(message);
      error.statusCode = 404;
    }

    const statusCode = err.statusCode || 500; // Default to 500 if not defined
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
