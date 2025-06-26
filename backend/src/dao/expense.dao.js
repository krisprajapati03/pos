// import Expense from "../models/expense.model.js";

// // export const createExpenseDao = async (data) => {
// //   return await Expense.create(data);
// // };

// export const createExpenseDao = async (data) => {
//   const created = await Expense.create(data);
//   return created;
// };


// export const getAllExpensesDao = async (shopId) => {
//   return await Expense.find({ shopId }).sort({ date: -1 });
// };

// export const getExpenseByIdDao = async (id, shopId) => {
//   return await Expense.findOne({ _id: id, shopId });
// };

// export const updateExpenseDao = async (id, data, shopId) => {
//   return await Expense.findOneAndUpdate({ _id: id, shopId }, data, { new: true });
// };

// export const deleteExpenseDao = async (id, shopId) => {
//   return await Expense.findOneAndDelete({ _id: id, shopId });
// };


// src/dao/expense.dao.js
import { Expense } from "../models/expense.model.js";

export const createExpenseDao = async (data) => {
  return await Expense.create(data);
};

export const getExpensesDao = async (shopId) => {
  return await Expense.find({ shopId }).sort({ createdAt: -1 });
};
