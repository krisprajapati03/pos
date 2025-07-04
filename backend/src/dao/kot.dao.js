import { KOT } from "../models/kot.model.js";

export const createKOTDao = async (data) => {
  return await KOT.create(data); // no separate shopId param needed
};

export const getKOTByTableDao = async (tableId, shopId) =>
  await KOT.find({ tableId, shopId }).sort({ createdAt: -1 });

export const updateKOTStatusDao = async (id, status) =>
  await KOT.findByIdAndUpdate(id, { status }, { new: true });

export const getPendingKOTsDao = async (shopId) =>
  await KOT.find({ shopId, status: { $ne: "billed" } })
    .sort({ createdAt: -1 })
    .populate("tableId", "name")
    .populate("orderItems.productId", "name");

export const getKOTByIdDao = async (id, shopId) =>
  await KOT.findOne({ _id: id, shopId });

export const getAllKOTsDao = async (shopId) => {
  return await KOT.find({ shopId })
    .sort({ createdAt: -1 })
    .populate("tableId", "name")
    .populate("orderItems.productId", "name");
};

export const deleteKOTDao = async (id, shopId) => {
  return await KOT.findOneAndDelete({ _id: id, shopId });
};
