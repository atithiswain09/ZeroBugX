import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/V1`,
  withCredentials: true,
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (unauthorized) globally — redirect to login
    if (error.response?.status === 401) {
      // Only redirect if not already on auth pages
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/signup") {
        // Don't redirect for check-auth calls (handled by App.jsx)
        const isCheckAuth = error.config?.url?.includes("check-auth");
        if (!isCheckAuth) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
