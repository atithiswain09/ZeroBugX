import LoginComponent from "./pages/Login";
import SignupComponent from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import RevivePage from "../src/pages/RevivePage";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
