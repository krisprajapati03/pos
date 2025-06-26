import express from "express";
import {
  createLoyaltyPoint,
  getLoyaltyPointsByCustomer,
  getAllLoyaltyPoints
} from "../controllers/loyalty.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createLoyaltyPoint);  // called after bill/payment
router.get("/customer/:id", authMiddleware, getLoyaltyPointsByCustomer);
router.get("/", authMiddleware, getAllLoyaltyPoints);

export default router;
