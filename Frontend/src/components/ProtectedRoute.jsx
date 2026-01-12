import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { isAuth,appLoaded } = useContext(AuthContext);
  if(!appLoaded) return <Navigate to="/" />
  if (!isAuth) return <Navigate to="/login"/>;
  return children;
}

export default ProtectedRoute;
