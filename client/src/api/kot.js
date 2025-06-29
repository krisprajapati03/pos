import axios from "../api/axios";

export const createKot = (payload) => axios.post("/kot", payload);
export const kotToBill = (id) => axios.post(`/kot/to-bill/${id}`);
