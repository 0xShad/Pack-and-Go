import mongoose from "mongoose";
import { DB_URI } from "../config/config";

const connectToDatabase = async () => {
  if (!DB_URI) throw new Error("DB_URI is not defined");

  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

export default connectToDatabase
