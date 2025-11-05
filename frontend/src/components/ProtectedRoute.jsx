import React from "react";
import { Navigate } from "react-router-dom";

// user is passed from App.jsx (stored in state)
export default function ProtectedRoute({ user, allowedRoles, children }) {
  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but not enough permissions
    return <Navigate to="/" replace />;
  }

  return children;
}
