import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createStockTransactionService,
  getStockTransactionsService,
  getStockTransactionsByProductService,
  getStockSummaryService
} from "../services/stock.service.js";

export const createStockTransaction = wrapAsync(async (req, res) => {
  const transaction = await createStockTransactionService(req.body, req.user.shopId);
  res.status(201).json({ message: "Stock transaction created", transaction });
});

export const getStockTransactions = wrapAsync(async (req, res) => {
  const transactions = await getStockTransactionsService(req.user.shopId);
  res.status(200).json({ transactions });
});

export const getStockTransactionsByProduct = wrapAsync(async (req, res) => {
  const transactions = await getStockTransactionsByProductService(req.params.id, req.user.shopId);
  res.status(200).json({ transactions });
});

// ✅ New: Get current stock per product
export const getStockSummary = wrapAsync(async (req, res) => {
  const stock = await getStockSummaryService(req.user.shopId);
  res.status(200).json({ stock });
});
