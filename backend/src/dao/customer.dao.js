import { Customer } from "../models/customer.model.js";

export const createCustomerDao = async (data) => {
  return await Customer.create(data);
};

export const getAllCustomersDao = async (shopId) => {
  return await Customer.find({ shopId });
};

export const getCustomerByIdDao = async (id, shopId) => {
  return await Customer.findOne({ _id: id, shopId });
};

export const updateCustomerDao = async (id, data, shopId) => {
  return await Customer.findOneAndUpdate({ _id: id, shopId }, data, { new: true });
};

export const deleteCustomerDao = async (id, shopId) => {
  return await Customer.findOneAndDelete({ _id: id, shopId });
};
