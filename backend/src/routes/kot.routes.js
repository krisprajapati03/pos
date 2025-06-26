import express from "express";
import {
  createKOT,
  getKOTByTable,
  updateKOTStatus,
  convertKOTToBill,
  getPendingKOTs
} from "../controllers/kot.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post('/', authMiddleware, requireRole("staff", "admin"), createKOT);
router.get("/pending", authMiddleware, getPendingKOTs);
router.get("/table/:id", authMiddleware, getKOTByTable);
router.put("/:id/status", authMiddleware, updateKOTStatus);
router.post("/to-bill/:id", authMiddleware, requireRole("admin"), convertKOTToBill);

export default router;
