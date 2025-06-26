import {
  createStockTransactionDao,
  getStockTransactionsDao,
  getStockTransactionsByProductDao,
  getStockSummaryDao
} from "../dao/stock.dao.js";

export const createStockTransactionService = async (data, shopId) => {
  return await createStockTransactionDao({ ...data, shopId });
};

export const getStockTransactionsService = async (shopId) => {
  return await getStockTransactionsDao(shopId);
};

export const getStockTransactionsByProductService = async (productId, shopId) => {
  return await getStockTransactionsByProductDao(productId, shopId);
};

// ✅ New: Live stock summary per product
export const getStockSummaryService = async (shopId) => {
  return await getStockSummaryDao(shopId);
};
