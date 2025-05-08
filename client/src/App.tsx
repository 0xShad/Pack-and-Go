import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage";
import TourDetails from "./pages/tourdetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/tour/:id",
    element: <TourDetails />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
