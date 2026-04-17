import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            padding: "12px 20px",
            borderRadius: "12px",
            background: "#1f2937",
            color: "#f2f2f2",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#1f2937",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1f2937",
            },
          },
        }}
      />
      <App />
    </AuthProvider>
  </BrowserRouter>
);
