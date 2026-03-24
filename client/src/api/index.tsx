import axios from "axios";

const api = axios.create({
  baseURL: "https://jobify-1-whmc.onrender.com/api",
  withCredentials: true,
});
export default api;
