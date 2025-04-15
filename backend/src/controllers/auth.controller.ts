import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UserRequestSchema } from "../validators/UserRequest.zod";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { SignInZodSchema } from "../validators/SignIn.zod";

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

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  // fetch email and password
  // check if the user exist
  // compare the password to the hashedpassword
  // validate ? logged ins : error
  try {
    const { email, password } = SignInZodSchema.parse(req.body) 

    const user = await User.findOne({email})

    if (!user) {
      const error = new Error('User not found') as Error & {statusCode?: number}
      error.statusCode = 404
      throw error
    }
    
    const userHashedPassword = user.password

    const isPasswordValid = await bcrypt.compare(password, userHashedPassword)

    if (!isPasswordValid) {
      const error = new Error('Password is incorrect') as Error & {statusCode?: number}
      error.statusCode = 401
      throw error
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1d"})

    res.status(202).json({
      success: true,
      message: 'logged in successful',
      data: {
        token,
        user
      }
    })

  } catch (error) {
    next(error)
  }

};
