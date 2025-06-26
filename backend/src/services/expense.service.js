// src/services/expense.service.js
import { createExpenseDao, getExpensesDao } from "../dao/expense.dao.js";

export const createExpenseService = async (data, user) => {
  return await createExpenseDao({
    ...data,
    shopId: user.shopId,
    createdBy: user._id
  });
};

export const getExpensesService = async (shopId) => {
  return await getExpensesDao(shopId);
};


// import {
//   createExpenseDao,
//   getAllExpensesDao,
//   getExpenseByIdDao,
//   updateExpenseDao,
//   deleteExpenseDao
// } from "../dao/expense.dao.js";

// export const createExpenseService = async (data, shopId, userId) => {
//   return await createExpenseDao({ ...data, shopId, addedBy: userId });
// };

// export const getAllExpensesService = async (shopId) => {
//   return await getAllExpensesDao(shopId);
// };

// export const getExpenseByIdService = async (id, shopId) => {
//   return await getExpenseByIdDao(id, shopId);
// };

// export const updateExpenseService = async (id, data, shopId) => {
//   return await updateExpenseDao(id, data, shopId);
// };

// export const deleteExpenseService = async (id, shopId) => {
//   return await deleteExpenseDao(id, shopId);
// };
