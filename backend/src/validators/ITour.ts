import { Document, Types } from "mongoose";

export interface ITour {
  TourTitle: string;
  TourDescription: string;
  TourPax: number;
  TourLocation: string;
  TourDate: Date;
  TourPrice: number;
  Image: {
    public_id: string;
    imgUrl: string;
  };
  Organizer: Types.ObjectId; // Ref to User
  Participants: Types.ObjectId[]; // Array of User IDs
  isFull?: Boolean;
  CreatedAt?: Date;
}

export interface TourDocumentModel extends ITour, Document {}
