import express from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById
} from "../controllers/purchase.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPurchase);
router.get("/", authMiddleware, getAllPurchases);
router.get("/:id", authMiddleware, getPurchaseById);

export default router;
