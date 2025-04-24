import AuthPage from "./pages/authpage";
import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./pages/homepage";
import ProtectedRoute from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    )
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
