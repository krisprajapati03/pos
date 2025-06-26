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
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, requireRole("admin", "provider"), createShop);
router.get("/", authMiddleware, getAllShops);
router.get("/:id", authMiddleware, getShopById);
router.put("/:id", authMiddleware, requireRole("admin", "provider"), updateShop);
router.delete("/:id", authMiddleware, requireRole("admin", "provider"), deleteShop);

export default router;
