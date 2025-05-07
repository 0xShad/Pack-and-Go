import mongoose from "mongoose";
import { TourDocumentModel } from "../validators/ITour";

const TourSchema = new mongoose.Schema<TourDocumentModel>({
  TourTitle: {
    type: String,
    required: true,
    trim: true,
  },

  TourDescription: {
    type: String,
    required: true,
  },

  TourPax: {
    type: Number,
    required: true,
    min: 1,
  },

  TourLocation: {
    type: String,
    required: true,
  },

  TourDate: {
    type: Date,
    required: true,
  },

  TourPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  Image: {
    public_id: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },

  Organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  isFull: {
    type: Boolean,
    default: false,
  },

  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Tour = mongoose.model<TourDocumentModel>("Tour", TourSchema);
export default Tour;
