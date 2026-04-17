import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useCallback, useContext, lazy, Suspense } from "react";
import { AuthContext } from "./context/AuthContext";
import { checkAuthAPI } from "./api/Auth.api";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";

// Lazy-loaded pages for code splitting
const LoginComponent = lazy(() => import("./pages/Login"));
const SignupComponent = lazy(() => import("./pages/Signin"));
const HomePage = lazy(() => import("./pages/Home"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { setUser, setIsAuth, setAppLoaded } = useContext(AuthContext);

  const checkAuth = useCallback(async () => {
    try {
      setAppLoaded(false);
      const { data } = await checkAuthAPI();

      if (data?.user) {
        setUser(data.user);
        setIsAuth(true);
      } else {
        setUser(null);
        setIsAuth(false);
      }
    } catch {
      setUser(null);
      setIsAuth(false);
    } finally {
      setAppLoaded(true);
    }
  }, [setUser, setIsAuth, setAppLoaded]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Auth Routes (no navbar) */}
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/login" element={<LoginComponent />} />

        {/* App Routes (with navbar) */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />

        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
