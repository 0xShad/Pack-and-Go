import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage";
import TourDetails from "./pages/tourdetails"
import TourPage from "./pages/tour";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/tour/:id",
    element: <TourDetails />,
  },
  {
    path: '/tour',
    element: <TourPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
