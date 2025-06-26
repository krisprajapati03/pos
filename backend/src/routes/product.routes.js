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

const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, requireRole("admin"), updateProduct);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteProduct);

export default router;