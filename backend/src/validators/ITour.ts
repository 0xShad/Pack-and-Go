import { Document, Types } from "mongoose";

export interface ITour {
  TourTitle: string;
  TourDescription: string;
  TourPax: number;
  TourLocation: string;
  TourDate: Date;
  TourPrice: number;
  Organizer: Types.ObjectId; // Ref to User
  Participants: Types.ObjectId[]; // Array of User IDs
  isFull?: Boolean;
  CreatedAt?: Date;
}

export interface TourDocumentModel extends ITour, Document {}
