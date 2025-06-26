import { KOT } from "../models/kot.model.js";

export const createKOTDao = async (data) => await KOT.create(data);

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
