import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./pages/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
