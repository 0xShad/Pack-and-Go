import axios from "axios";
import { useEffect, useState } from "react";
import { GlobeIcon } from "lucide-react";

interface Tour {
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

const TourCards = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tour");
        setTours(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {tours.map((tour, index) => {
        const formattedDate = new Date(tour.TourDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }
        );

        return (
          <div
            key={index}
            className="max-w-2xs flex flex-col border border-gray-300 rounded-lg cursor-pointer"
            id={tour._id}
          >
            <img
              src={tour.Image.imgUrl}
              className="rounded-lg object-contain"
              alt=""
            />
            <div className="flex items-center gap-1 py-1">
              <GlobeIcon className="h-3 w-3 text-gray-500" />
              <span className="text-gray-500 text-sm">
                {tour.TourLocation}, Philippines
              </span>
            </div>
            <h1 className="font-bold text-lg my-2 px-2">{tour.TourTitle}</h1>
            <p className="text-sm text-gray-600 px-2 my-2">{formattedDate}</p>
            <h2 className="font-semibold px-2 mt-3 text-md">
              From{" "}
              <span className="font-bold text-orange-400">
                ₱{tour.TourPrice}
              </span>{" "}
              per person
            </h2>
          </div>
        );
      })}
    </>
  );
};
export default TourCards;
