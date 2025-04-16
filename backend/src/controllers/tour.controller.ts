import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Tour from "../models/tour.model";
import { User } from "../models/user.model";

export const getAllTours = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const tours = await Tour.find({ Organizer: userId });

    if (!tours) {
      res.status(404).json({ message: "No tours found" });
      return;
    }

    res.json(tours);
  } catch (error) {
    next(error);
  }
};

export const createTour = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const organizer = await User.findById(userId);

    if (!userId) {
      const error = new Error("UserId not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (!organizer) {
      const error = new Error("User not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    const {
      TourTitle,
      TourDescription,
      TourDate,
      TourLocation,
      TourPax,
      TourPrice,
    } = req.body;

    const newTour = new Tour({
      TourTitle,
      TourDescription,
      TourDate,
      TourLocation,
      TourPax,
      TourPrice,
      Organizer: organizer,
    });

    await newTour.save();
    res.status(201).json({
      success: true,
      message: "Tour created",
      data: {
        TourTitle,
        TourDescription,
        TourDate,
        TourLocation,
        TourPax,
        TourPrice,
        Organizer: organizer,
      },
    });
  } catch (error) {
    next(error);
  }
};
