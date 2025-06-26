// src/dao/shop.dao.js
import { Shop } from "../models/shop.model.js";

export const createShopDao = async (data) => {
  return await Shop.create(data);
};

export const getAllShopsDao = async () => {
  return await Shop.find().populate("owner");
};

export const getShopByIdDao = async (id) => {
  return await Shop.findById(id).populate("owner");
};

export const updateShopDao = async (id, data) => {
  return await Shop.findByIdAndUpdate(id, data, { new: true });
};

export const deleteShopDao = async (id) => {
  return await Shop.findByIdAndDelete(id);
};
