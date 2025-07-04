import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api" || "https://pos-backend-4ki8c14u6-krisprajapati03s-projects.vercel.app/api",
  withCredentials: true,
});

export default API;
