import {
  createProductDao,
  getAllProductsDao,
  getProductByIdDao,
  updateProductDao,
  deleteProductDao
} from "../dao/product.dao.js";

export const createProductService = async (data, shopId) => {
  return await createProductDao({ ...data, shopId });
};

export const getAllProductsService = async (shopId) => {
  return await getAllProductsDao(shopId);
};

export const getProductByIdService = async (id, shopId) => {
  return await getProductByIdDao(id, shopId);
};

export const updateProductService = async (id, data, shopId) => {
  return await updateProductDao(id, data, shopId);
};

export const deleteProductService = async (id, shopId) => {
  return await deleteProductDao(id, shopId);
};
