// src/dao/category.dao.js
import { Category } from "../models/catagory.model.js";

export const createCategoryDao = async (data) => {
  return await Category.create(data);
};

export const getAllCategoriesDao = async (shopId) => {
  return await Category.find({ shopId });
};

export const getCategoryByIdDao = async (id) => {
  return await Category.findById(id);
};

export const updateCategoryDao = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategoryDao = async (id) => {
  return await Category.findByIdAndDelete(id);
};
