import {
  createStaffDao,
  getStaffListDao,
  updateStaffDao,
  deleteStaffDao,
} from "../dao/staff.dao.js";

export const createStaffService = async (data) => {
  return await createStaffDao(data);
};

export const getStaffService = async (shopId) => {
  return await getStaffListDao(shopId);
};

export const updateStaffService = async (id, data,shopId) => {
  return await updateStaffDao(id, data, shopId);
};

export const deleteStaffService = async (id,shopId) => {
  return await deleteStaffDao(id, shopId);
};