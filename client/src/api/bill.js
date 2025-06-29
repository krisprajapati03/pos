import axios from "../api/axios";

export const createBill = (payload) => axios.post("/bill", payload);
