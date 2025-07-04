import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import  { requireRole } from "../middlewares/role.middleware.js";
import { checkShopStatus } from "../middlewares/shopStatus.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, checkShopStatus, requireRole("admin","manager"), createProduct);
router.get("/", authMiddleware, checkShopStatus, getAllProducts);
router.get("/:id", authMiddleware, checkShopStatus, getProductById);
router.put("/:id", authMiddleware, checkShopStatus, requireRole("admin","manager"), updateProduct);
router.delete("/:id", authMiddleware, checkShopStatus, requireRole("admin","manager"), deleteProduct);

export default router;