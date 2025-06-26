import { Expense } from "../models/expense.model.js";

export const createExpenseDao = async (data) => {
  return await Expense.create(data);
};

export const getAllExpensesDao = async (shopId) => {
  return await Expense.find({ shopId }).sort({ createdAt: -1 });
};

export const updateExpenseDao = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, { new: true });
};

export const deleteExpenseDao = async (id) => {
  return await Expense.findByIdAndDelete(id);
};
