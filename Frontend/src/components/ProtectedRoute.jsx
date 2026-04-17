import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuth, appLoaded } = useContext(AuthContext);

  if (!appLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
          <p className="text-[var(--color-accent)] text-sm font-medium animate-pulse">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
