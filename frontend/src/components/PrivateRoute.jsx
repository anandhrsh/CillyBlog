import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx"; // Ensure correct import path

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow access
  return children;
}
