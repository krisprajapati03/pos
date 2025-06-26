// src/routes/expense.routes.js
import express from "express";
import { createExpense, getExpenses } from "../controllers/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createExpense); // All roles allowed
router.get("/", authMiddleware, getExpenses);

export default router;



// import express from "express";
// import {
//   createExpense,
//   getAllExpenses,
//   getExpenseById,
//   updateExpense,
//   deleteExpense
// } from "../controllers/expense.controller.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.post("/", authMiddleware, createExpense);
// router.get("/", authMiddleware, getAllExpenses);
// router.get("/:id", authMiddleware, getExpenseById);
// router.put("/:id", authMiddleware, updateExpense);
// router.delete("/:id", authMiddleware, deleteExpense);

// export default router;
