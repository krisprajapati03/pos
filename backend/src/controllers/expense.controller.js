import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createExpenseService,
  getAllExpensesService,
  updateExpenseService,
  deleteExpenseService
} from "../services/expense.service.js";

export const createExpense = wrapAsync(async (req, res) => {
  const data = {
    ...req.body,
    shopId: req.user.shopId,
    createdBy: req.user._id
  };
  const expense = await createExpenseService(data);
  res.status(201).json({ message: "Expense added", expense });
});

export const getAllExpenses = wrapAsync(async (req, res) => {
  const expenses = await getAllExpensesService(req.user.shopId);
  res.json({ expenses });
});

export const updateExpense = wrapAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
  }
  const updated = await updateExpenseService(req.params.id, req.body, req.user.shopId);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Expense not found" });
  }
  res.json({ success: true, message: "Expense updated", expense: updated });
});

export const deleteExpense = wrapAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
  }
  const deleted = await deleteExpenseService(req.params.id, req.user.shopId);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Expense not found" });
  }
  res.json({ success: true, message: "Expense deleted" });
});
