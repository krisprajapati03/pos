import Bill from "../models/bill.model.js";

export const createBillDao = async (data) => {
  return await Bill.create(data);
};

export const getBillByIdDao = async (id) => {
    return await Bill.findById(id);
};

export const getAllBillsDao = async (shopId) => {
  return await Bill.find({ shopId })
    .sort({ createdAt: -1 })
    .populate("tableId", "tableNumber name"); // ✅ Populate table number and name
};