import {
  createCustomerDao,
  getAllCustomersDao,
  getCustomerByIdDao,
  updateCustomerDao,
  deleteCustomerDao
} from "../dao/customer.dao.js";

export const createCustomerService = async (data, shopId) => {
  return await createCustomerDao({ ...data, shopId });
};

export const getAllCustomersService = async (shopId) => {
  return await getAllCustomersDao(shopId);
};

export const getCustomerByIdService = async (id, shopId) => {
  return await getCustomerByIdDao(id, shopId);
};

export const updateCustomerService = async (id, data, shopId) => {
  return await updateCustomerDao(id, data, shopId);
};

export const deleteCustomerService = async (id, shopId) => {
  return await deleteCustomerDao(id, shopId);
};
