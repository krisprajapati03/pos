// ✅ Route File (src/routes/shop.routes.js)
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
  getMyShopController,
  createShopController,
  getShopByOwnerIdController
} from "../controllers/shop.controller.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();


router.post("/", authMiddleware, createShopController);
//router.get("/", authMiddleware, getAllShops);
//router.get("/:id", authMiddleware, getShopById);
router.put("/:id", authMiddleware, requireRole("admin", "provider"), updateShop);
router.delete("/:id", authMiddleware, requireRole("admin", "provider"), deleteShop);

//router.get("/myshop", authMiddleware, getMyShopController); // 🔐 token-based
//router.get("/myshop-by-id", getShopByOwnerIdController);     // ✅ public version



// ✅ PUBLIC ROUTES FIRST
//router.get("/myshop-by-id", getShopByOwnerIdController);     // ✅ Must come before /:id
router.get("/myshop", authMiddleware, getMyShopController);

// 🔒 Protected Routes
router.get("/", authMiddleware, getAllShops);
router.get("/:id", authMiddleware, getShopById); // 👈 This should always be last

export default router;
