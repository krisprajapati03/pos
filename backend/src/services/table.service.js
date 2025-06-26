import {
  createTableDao,
  getAllTablesDao,
  updateTableStatusDao,
  deleteTableDao
} from "../dao/table.dao.js";

export const createTableService = async (data, shopId) => {
  return await createTableDao({ ...data, shopId });
};

export const getAllTablesService = async (shopId) => {
  return await getAllTablesDao(shopId);
};

export const updateTableStatusService = async (id, update) => {
  return await updateTableStatusDao(id, update);
};

export const deleteTableService = async (id) => {
  return await deleteTableDao(id);
};
