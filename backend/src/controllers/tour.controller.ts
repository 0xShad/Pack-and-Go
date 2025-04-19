import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Tour from "../models/tour.model";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export const getAllTours = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const tours = await Tour.find({ $or: [{Organizer: userId}, {Participants: userId} ]  });

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

export const joinTour = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const TourId = req.params.id;
    const tour = await Tour.findById(TourId);

    if (!user) {
      const error = new Error("User not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (!userId) {
      const error = new Error("UserId is not provided") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (!tour) {
      const error = new Error("Tour not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    //check if the user is already joined to the tour
    if (tour.Participants.includes(user._id as mongoose.Types.ObjectId)) {
      const error = new Error("Already joined") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    //check if the user is the creator of the tour
    if (tour.Organizer.toString() === userId.toString()) {
      const error = new Error("You cannot join your own tour.") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    tour.Participants.push(user._id as mongoose.Types.ObjectId);
    await tour.save();
    res.status(200).json({
      success: true,
      message: "Successfully joined the tour",
    });
  } catch (error) {
    next(error);
  }
};

export const unJoinATour = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const TourId = req.params.id;

    const tour = await Tour.findById(TourId);
    const user = await User.findById(userId);

    if (!tour) {
      const error = new Error("Tour not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (!user) {
      const error = new Error("User not found") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    //check if the user is actually joined to that specific tour
    if (!tour.Participants.includes(user._id as mongoose.Types.ObjectId)) {
      res.status(404).json({
        message: "User does not belong to this tour",
      });
      return;
    }

    (
      tour.Participants as mongoose.Types.DocumentArray<mongoose.Types.ObjectId>
    ).pull(user._id);
    await tour.save();

    res.status(200).json({
      success: true,
      message: `Successfully unjoined the tour of ${tour.TourTitle}`,
    });
  } catch (error) {
    next(error);
  }
};
