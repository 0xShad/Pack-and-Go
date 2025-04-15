import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UserRequestSchema } from "../validators/UserRequest.zod";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, firstName, lastName, email, password } =
      UserRequestSchema.parse(req.body);

    const userIsExisting = await User.findOne({ email });

    const usernameIsExisting = await User.findOne({ username });

    if (usernameIsExisting) {
      const error = new Error("Username is already existing") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    if (userIsExisting) {
      const error = new Error("User is already exisiting") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Push to db
    const newUser = await User.create([
      { username, firstName, lastName, email, password: hashedPassword },
    ]);

    //Create token for that user
    const token = jwt.sign(
      { userId: newUser[0]._id },
      JWT_SECRET,
      { expiresIn: "1d" } // resolves to '1d'
    );

    await session.commitTransaction();
    res.status(202).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.endSession();
    session.abortTransaction();
    next(error);
  }
};

export const signIn = () => {};
