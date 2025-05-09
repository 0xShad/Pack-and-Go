import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/config";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
  TourTitle?: string;
  TourDescription?: string;
  TourPax?: number;
  TourLocation?: string;
  TourDate?: Date;
  TourPrice?: number;
}

const authorize = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(404).json({ message: "Auth header is empty" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Authentication token required",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next(); // continue to route handler
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authorize;
