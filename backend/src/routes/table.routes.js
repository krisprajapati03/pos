import express from "express";
import {
  createTable,
  getAllTables,
  updateTableStatus,
  deleteTable
} from "../controllers/table.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTable);
router.get("/", authMiddleware, getAllTables);
router.put("/:id", authMiddleware, updateTableStatus);
router.delete("/:id", authMiddleware, deleteTable);

export default router;
