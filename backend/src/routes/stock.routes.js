import express from "express";
import {
  createStockTransaction,
  getStockTransactions,
  getStockTransactionsByProduct,
  getStockSummary,
  getLowStockProducts
} from "../controllers/stock.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createStockTransaction);
router.get("/", authMiddleware, getStockTransactions);
router.get("/product/:id", authMiddleware, getStockTransactionsByProduct);
router.get("/summary", authMiddleware, getStockSummary);
router.get("/low-stock", authMiddleware, getLowStockProducts);


export default router;
