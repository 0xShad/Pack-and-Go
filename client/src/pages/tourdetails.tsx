import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import { Tour } from "@/types/tour";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<Tour>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tour/${id}`
        );
        setTour(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour details:", error);
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  console.log(tour);

  const formattedDate = new Date(tour.TourDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 mt-6 border border-gray-200 rounded-sm my-4">
        <Link to="/tour">
          <ArrowLeft className="m-4"/>
        </Link>
        <img
          src={tour.Image.imgUrl}
          alt=""
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {tour.TourTitle}
          </h1>
          <p className="text-gray-500 text-md mb-1">
            {tour.TourLocation}, Philippines
          </p>
          <p className="text-sm text-gray-400 mb-4">{formattedDate}</p>
          <h2 className="text-xl font-semibold mb-2 text-orange-500">
            ₱{tour.TourPrice} per person
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {tour.TourDescription}
          </p>
        </div>
        <div className="">
          <h2 className="font-bold text-lg">
            Joiners Slot: {tour.Participants.length}/{tour.TourPax}
          </h2>
          <h1 className="font-bold text-lg">
            Organizer: <span className="font-semibold">{tour.Organizer}</span>
          </h1>
        </div>

        <Button className="mt-4 text-xl px-8 py-4 bg-orange-500 text-white hover:bg-orange-600 cursor-pointer">
          Book Now{" "}
        </Button>
      </div>
    </>
  );
};
export default TourDetails;
