import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("accessToken");

  // ------------------------------
  // LOADING STATE
  // ------------------------------
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  // ------------------------------
  // NOT AUTHENTICATED
  // ------------------------------
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ------------------------------
  // ROLE NOT ALLOWED
  // ------------------------------
  if (allowedRoles?.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin" : "/student"}
        replace
      />
    );
  }

  // ------------------------------
  // ALLOWED → render the actual page
  // ------------------------------
  return <Outlet />;
};

export default ProtectedRoute;



