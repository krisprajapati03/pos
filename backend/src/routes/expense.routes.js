import express from "express";
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.put("/:id", updateExpense);  // ✅ Admin only
router.delete("/:id", deleteExpense);  // ✅ Admin only

export default router;
