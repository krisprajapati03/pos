import { KOT } from "../models/kot.model.js";

export const createKOTDao = async (data) => {
  return await KOT.create(data);
};

export const getKOTByTableDao = async (tableId, shopId) => {
  return await KOT.find({ tableId, shopId }).sort({ createdAt: -1 });
};

export const updateKOTStatusDao = async (id, status) => {
  return await KOT.findByIdAndUpdate(id, { status }, { new: true });
};

export const getPendingKOTsDao = async (shopId) => {
  return await KOT.find({ shopId, status: { $ne: "billed" } })
    .sort({ createdAt: -1 })
    .populate("tableId", "name")
    .populate("orderItems.productId", "name");
};

export const getKOTByIdDao = async (kotId, shopId) => {
  return await KOT.findOne({ _id: kotId, shopId });
};

export const markKOTAsBilledDao = async (kotId) => {
  return await KOT.findByIdAndUpdate(kotId, { status: "billed" }, { new: true });
};
