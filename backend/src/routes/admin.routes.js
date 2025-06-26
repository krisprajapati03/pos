import express from "express";
import {
  getAllShops,
  updateShopStatus,
  extendShopPlan
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware, requireRole("provider"));  // Only software provider

router.get("/shops", getAllShops);
router.put("/shops/:id/status", updateShopStatus);
router.put("/shops/:id/extend", extendShopPlan);

export default router;
