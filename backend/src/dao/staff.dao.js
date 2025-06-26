import Staff from "../models/staff.model.js";

export const createStaffDao = async (data) => {
  return await Staff.create(data);
};

export const getStaffListDao = async (shopId) => {
  return await Staff.find({ shopId });
};

export const updateStaffDao = async (id, data, shopId) => {
  return await Staff.findOneAndUpdate({ _id: id, shopId }, data, { new: true });
};

export const deleteStaffDao = async (id, shopId) => {
  return await Staff.findOneAndDelete({ _id: id, shopId });
};