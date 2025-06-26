import express from "express";
import { createMoneyOut, getMoneyOutList } from "../controllers/moneyOut.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMoneyOut);
router.get("/", authMiddleware, getMoneyOutList);

export default router;