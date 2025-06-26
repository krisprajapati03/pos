// src/dao/supplier.dao.js
import { Supplier } from "../models/supplier.model.js";

export const createSupplierDao = async (data) => {
  return await Supplier.create(data);
};

export const getAllSuppliersDao = async (shopId) => {
  return await Supplier.find({ shopId });
};

export const getSupplierByIdDao = async (id) => {
  return await Supplier.findById(id);
};

export const updateSupplierDao = async (id, data) => {
  return await Supplier.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSupplierDao = async (id) => {
  return await Supplier.findByIdAndDelete(id);
};
