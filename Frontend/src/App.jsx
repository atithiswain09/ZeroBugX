import LoginComponent from "./pages/Login";
import SignupComponent from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
  //     import RevivePage from "../src/pages/RevivePage"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
      </Routes>

      {/* <RevivePage /> */}
    </div>
  );
}

export default App;
