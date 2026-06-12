import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuth, appLoaded } = useContext(AuthContext);

  if (!appLoaded) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
        {/* Navbar Skeleton */}
        <div className="h-[72px] border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]/80 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-border-subtle)] animate-pulse" />
            <div className="w-24 h-5 rounded bg-[var(--color-border-subtle)] animate-pulse hidden sm:block" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-8 rounded-lg bg-[var(--color-border-subtle)] animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-[var(--color-border-subtle)] animate-pulse" />
          </div>
        </div>

        {/* Page Content Skeleton */}
        <div className="flex-1 p-4 sm:p-6 flex justify-center items-start pt-12">
          <div className="w-full max-w-5xl space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-3">
              <div className="w-1/3 h-8 rounded-lg bg-[var(--color-border-subtle)] animate-pulse" />
              <div className="w-1/4 h-4 rounded bg-[var(--color-border-subtle)] animate-pulse" />
            </div>
            
            {/* Split Layout Skeleton (simulating review page) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[400px] rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] animate-pulse" />
              <div className="h-[400px] rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
