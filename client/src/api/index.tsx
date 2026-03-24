import axios from "axios";

const api = axios.create({
  baseURL: "https://jobify-1-whmc.onrender.com/api",
  // --- السطر الناقص والجوهري ---
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;