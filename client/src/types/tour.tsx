export interface Tour {
  TourTitle: string;
  TourDescription: string;
  TourPrice: number;
  TourLocation: string;
  TourDate: string;
  TourPax: number;
  Image: {
    public_id: string;
    imgUrl: string;
  };
  isFull: boolean;
  _id: string;
  Organizer: string;
  Participants: string[];
}