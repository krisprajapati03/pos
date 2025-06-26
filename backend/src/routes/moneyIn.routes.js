import express from "express";
import { createMoneyIn, getMoneyInList } from "../controllers/moneyIn.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMoneyIn);
router.get("/", authMiddleware, getMoneyInList);

export default router;
