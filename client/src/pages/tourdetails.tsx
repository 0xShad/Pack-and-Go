import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tour/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };
    fetchTour();
  }, [id]);

  return  <div>
  <h1>Tour Details Page</h1>
</div>
};
export default TourDetails;
