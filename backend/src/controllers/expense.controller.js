import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createExpenseService,
  getAllExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService
} from "../services/expense.service.js";

export const createExpense = async (req, res) => {
  const expense = await createExpenseService(req.body, req.user.shopId, req.user._id);
  console.log("Expense created:", req.body);
  if (!expense) return res.status(400).json({ error: "Failed to create expense" });
  res.status(201).json({ message: "Expense recorded", expense });
};

export const getAllExpenses = wrapAsync(async (req, res) => {
  const expenses = await getAllExpensesService(req.user.shopId);
  if (!expense) return res.status(404).json({ error: "Expense not found" });
  res.status(200).json({ expenses });
});

export const getExpenseById = wrapAsync(async (req, res) => {
  const expense = await getExpenseByIdService(req.params.id, req.user.shopId);
  if (!expense) return res.status(404).json({ error: "Expense not found" });
  res.status(200).json({ expense });
});

export const updateExpense = wrapAsync(async (req, res) => {
  const updated = await updateExpenseService(req.params.id, req.body, req.user.shopId);
  if (!updated) return res.status(400).json({ error: "Failed to update expense" });
  res.status(200).json({ message: "Expense updated", expense: updated });
});

export const deleteExpense = wrapAsync(async (req, res) => {
  await deleteExpenseService(req.params.id, req.user.shopId);
  if (!req.params.id) return res.status(404).json({ error: "Expense not found" });
  res.status(200).json({ message: "Expense deleted" });
});
