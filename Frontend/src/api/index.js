import axios from "axios";
const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/V1`,
  withCredentials: true,
});
export default API;
