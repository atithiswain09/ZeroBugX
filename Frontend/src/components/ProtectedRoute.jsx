import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
