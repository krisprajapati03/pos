import express from "express";
import {
  createStaff,
  getStaffList,
  updateStaff,
  deleteStaff,
} from "../controllers/staff.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createStaff);
router.get("/", authMiddleware, getStaffList);
router.put("/:id", authMiddleware, updateStaff);
router.delete("/:id", authMiddleware, deleteStaff);

export default router;
