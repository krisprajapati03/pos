import express from "express";
import {
  createKOT,
  getKOTByTable,
  updateKOTStatus,
  convertKOTToBill,
  getPendingKOTs
} from "../controllers/kot.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/to-bill/:id", authMiddleware, convertKOTToBill);
router.post("/", authMiddleware, createKOT);
router.get("/pending", authMiddleware, getPendingKOTs);
router.get("/table/:id", authMiddleware, getKOTByTable);
router.put("/:id/status", authMiddleware, updateKOTStatus);

export default router;
