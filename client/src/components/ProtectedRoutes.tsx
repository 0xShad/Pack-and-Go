import { Navigate } from "react-router";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  const isAuthenticated =
    token && expiry && new Date().getTime() < parseInt(expiry);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
