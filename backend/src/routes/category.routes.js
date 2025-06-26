// src/routes/category.routes.js
import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createCategory);
router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.put("/:id", authMiddleware, requireRole("admin"), updateCategory);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteCategory);

export default router;
