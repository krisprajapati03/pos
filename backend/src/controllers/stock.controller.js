import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createStockTransactionService,
  getStockTransactionsService,
  getStockTransactionsByProductService,
  getStockSummaryService,
  getLowStockProductsService
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

export const getStockSummary = wrapAsync(async (req, res) => {
  const stock = await getStockSummaryService(req.user.shopId);
  res.status(200).json({ stock });
});

export const getLowStockProducts = wrapAsync(async (req, res) => {
  const shopId = req.user.shopId;
  const threshold = parseInt(req.query.threshold) || 5;

  const products = await getLowStockProductsService(shopId, threshold);
  res.status(200).json({ products });
});
