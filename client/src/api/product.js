import API from "./axios";

export const getProducts = () => API.get("/product");
export const getProduct = (id) => API.get(`/product/${id}`);
export const createProduct = (data) => API.post("/product", data);
export const updateProduct = (id, data) => API.put(`/product/${id}`, data);
export const deleteProduct = (id) => API.delete(`/product/${id}`);
