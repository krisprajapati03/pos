import express from "express";
import { createEstimate, getEstimates } from "../controllers/estimate.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEstimate);
router.get("/", authMiddleware, getEstimates);

export default router;