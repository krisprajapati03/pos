import {
  createStockTransactionDao,
  getStockTransactionsDao,
  getStockTransactionsByProductDao,
  getStockSummaryDao,
  getLowStockProductsDao
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

export const getStockSummaryService = async (shopId) => {
  return await getStockSummaryDao(shopId);
};

export const getLowStockProductsService = (shopId, threshold) =>
  getLowStockProductsDao(shopId, threshold);
