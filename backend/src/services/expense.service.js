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

export const updateExpenseService = async (id, data) => {
  return await updateExpenseDao(id, data);
};

export const deleteExpenseService = async (id) => {
  return await deleteExpenseDao(id);
};
