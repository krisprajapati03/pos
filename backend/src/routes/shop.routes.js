// src/routes/shop.routes.js
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop
} from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createShop);
router.get("/", authMiddleware, getAllShops);
router.get("/:id", authMiddleware, getShopById);
router.put("/:id", authMiddleware, updateShop);
router.delete("/:id", authMiddleware, deleteShop);

export default router;
