import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackStatus
} from "../controllers/feedback.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createFeedback);
router.get("/", authMiddleware, getAllFeedbacks); // admin only, optionally add role check
router.get("/:id", authMiddleware, getFeedbackById);
router.put("/:id/status", authMiddleware, updateFeedbackStatus);

export default router;
