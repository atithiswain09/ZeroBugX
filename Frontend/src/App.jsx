import LoginComponent from "./pages/Login";
import SignupComponent from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import RevivePage from "../src/pages/RevivePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { checkAuthAPI } from "./api/Auth.api";
function App() {
  const { setUser, setIsAuth, setappLoaded } = useContext(AuthContext);
  const cheackauth = useCallback(async () => {
    try {
      setappLoaded(false);
      const { data } = await checkAuthAPI();
      console.log(data);

      if (!data.user) {
        setUser(null);
        setIsAuth(false);
        return;
      }
      setUser(data.user);
      setIsAuth(true);
    } catch  {
      setUser(null);
      setIsAuth(false);
      
    } finally {
      setappLoaded(true);
    }
  }, [setUser, setIsAuth, setappLoaded]);
  useEffect(() => {
    cheackauth();
  }, [cheackauth]);

  return (
    <>
      {
        <Routes>
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/login" element={<LoginComponent />} />
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
            path="/reviwe"
            element={
              <ProtectedRoute>
                <RevivePage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      }
    </>
  );
}

export default App;
