import express from "express";
import {
  createNotification,
  getMyNotifications,
  markNotificationAsRead,
  deleteNotification
} from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createNotification); // For admin to push alerts
router.get("/", authMiddleware, getMyNotifications);
router.put("/:id/read", authMiddleware, markNotificationAsRead);
router.delete("/:id", authMiddleware, deleteNotification);

export default router;
