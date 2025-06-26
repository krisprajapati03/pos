// src/services/supplier.service.js
import {
  createSupplierDao,
  getAllSuppliersDao,
  getSupplierByIdDao,
  updateSupplierDao,
  deleteSupplierDao,
} from "../dao/supplier.dao.js";

export const createSupplierService = async (data, shopId) => {
  return await createSupplierDao({...data, shopId});
};

export const getAllSuppliersService = async (shopId) => {
  return await getAllSuppliersDao(shopId);
};

export const getSupplierByIdService = async (id) => {
  return await getSupplierByIdDao(id);
};

export const updateSupplierService = async (id, data) => {
  return await updateSupplierDao(id, data);
};

export const deleteSupplierService = async (id) => {
  return await deleteSupplierDao(id);
};
