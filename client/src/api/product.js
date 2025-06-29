import axios from "./axios";

export const getProducts = () => axios.get("/product");
export const getProduct = (id) => axios.get(`/product/${id}`);
export const createProduct = (data) => axios.post("/product", data);
export const updateProduct = (id, data) => axios.put(`/product/${id}`, data);
export const deleteProduct = (id) => axios.delete(`/product/${id}`);
export const getCategories = () => axios.get("/categories");