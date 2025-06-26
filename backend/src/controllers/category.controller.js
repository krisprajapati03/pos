// src/controllers/category.controller.js
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service.js";
import wrapAsync from "../utils/tryCatchWapper.js";

export const createCategory = wrapAsync(async (req, res) => {
  const category = await createCategoryService(req.body, req.user.shopId);
  res.status(201).json({ message: "Category created", category });
});

export const getAllCategories = wrapAsync(async (req, res) => {
  const categories = await getAllCategoriesService(req.user.shopId);
  res.status(200).json({ categories });
});

export const getCategoryById = wrapAsync(async (req, res) => {
  const category = await getCategoryByIdService(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json({ category });
});

export const updateCategory = wrapAsync(async (req, res) => {
  const category = await updateCategoryService(req.params.id, req.body);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json({ message: "Category updated", category });
});

export const deleteCategory = wrapAsync(async (req, res) => {
  const category = await deleteCategoryService(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json({ message: "Category deleted" });
});
