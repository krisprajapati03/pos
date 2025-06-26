// src/services/shop.service.js
import {
  createShopDao,
  getAllShopsDao,
  getShopByIdDao,
  updateShopDao,
  deleteShopDao
} from "../dao/shop.dao.js";

export const createShopService = async (data) => {
  return await createShopDao(data);
};

export const getAllShopsService = async () => {
  return await getAllShopsDao();
};

export const getShopByIdService = async (id) => {
  return await getShopByIdDao(id);
};

export const updateShopService = async (id, data) => {
  return await updateShopDao(id, data);
};

export const deleteShopService = async (id) => {
  return await deleteShopDao(id);
};
