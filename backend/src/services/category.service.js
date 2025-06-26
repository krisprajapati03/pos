// src/services/category.service.js
import {
  createCategoryDao,
  getAllCategoriesDao,
  getCategoryByIdDao,
  updateCategoryDao,
  deleteCategoryDao,
} from "../dao/category.dao.js";

export const createCategoryService = async (data, shopId) => {
  const categoryData = { ...data, shopId };
  return await createCategoryDao(categoryData);
};

export const getAllCategoriesService = async (shopId) => {
  return await getAllCategoriesDao(shopId);
};

export const getCategoryByIdService = async (id) => {
  return await getCategoryByIdDao(id);
};

export const updateCategoryService = async (id, data) => {
  return await updateCategoryDao(id, data);
};

export const deleteCategoryService = async (id) => {
  return await deleteCategoryDao(id);
};
