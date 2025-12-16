import API from "./index";

export const signupAPI = (data) => API.post("/auth/signup", data);
export const loginAPI = (data) => API.post("/auth/login", data);
export const logoutAPI = () => API.post("/auth/logOut");
