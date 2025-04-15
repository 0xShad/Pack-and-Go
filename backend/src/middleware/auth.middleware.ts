import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

const authorize =  (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
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
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {}
};

export default authorize