import express from "express";
import {
  createStockTransaction,
  getStockTransactions,
  getStockTransactionsByProduct,
  getStockSummary
} from "../controllers/stock.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createStockTransaction);
router.get("/", authMiddleware, getStockTransactions);
router.get("/product/:id", authMiddleware, getStockTransactionsByProduct);

// ✅ New stock summary endpoint
router.get("/summary/all", authMiddleware, getStockSummary);

export default router;
