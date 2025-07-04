import {
  createExpenseDao,
  getAllExpensesDao,
  updateExpenseDao,
  deleteExpenseDao
} from "../dao/expense.dao.js";

export const createExpenseService = async (data) => {
  return await createExpenseDao(data);
};

export const getAllExpensesService = async (shopId) => {
  return await getAllExpensesDao(shopId);
};

export const updateExpenseService = async (id, data, shopId) => {
  return await updateExpenseDao(id, data, shopId);
};

export const deleteExpenseService = async (id, shopId) => {
  return await deleteExpenseDao(id, shopId);
};

