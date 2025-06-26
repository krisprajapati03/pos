import {
  createExpenseDao,
  getAllExpensesDao,
  getExpenseByIdDao,
  updateExpenseDao,
  deleteExpenseDao
} from "../dao/expense.dao.js";

export const createExpenseService = async (data, shopId, userId) => {
  return await createExpenseDao({ ...data, shopId, addedBy: userId });
};

export const getAllExpensesService = async (shopId) => {
  return await getAllExpensesDao(shopId);
};

export const getExpenseByIdService = async (id, shopId) => {
  return await getExpenseByIdDao(id, shopId);
};

export const updateExpenseService = async (id, data, shopId) => {
  return await updateExpenseDao(id, data, shopId);
};

export const deleteExpenseService = async (id, shopId) => {
  return await deleteExpenseDao(id, shopId);
};
