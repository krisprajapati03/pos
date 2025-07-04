import axios from "axios";

const API = axios.create({
  baseURL:"https://pos-backend-sandy.vercel.app/api",
  withCredentials: true,
});

export default API;
