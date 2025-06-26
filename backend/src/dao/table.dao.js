import { Table } from "../models/table.model.js";

export const createTableDao = async (data) => {
  return await Table.create(data);
};

export const getAllTablesDao = async (shopId) => {
  return await Table.find({ shopId }).sort({ tableNumber: 1 });
};

export const updateTableStatusDao = async (id, update) => {
  return await Table.findByIdAndUpdate(id, update, { new: true });
};

export const deleteTableDao = async (id) => {
  return await Table.findByIdAndDelete(id);
};
