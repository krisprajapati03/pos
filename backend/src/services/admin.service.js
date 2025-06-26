import { Shop } from "../models/shop.model.js";

export const getAllShopsService = async () => {
  return await Shop.find().select("name owner contactNumber planType planExpiry isActive");
};

export const updateShopStatusService = async (id, isActive) => {
  return await Shop.findByIdAndUpdate(id, { isActive }, { new: true });
};

export const extendShopPlanService = async (id, days) => {
  const shop = await Shop.findById(id);
  if (!shop) throw Object.assign(new Error("Shop not found"), { statusCode: 404 });

  const newExpiry = shop.planExpiry && shop.planExpiry > new Date()
    ? new Date(shop.planExpiry.getTime() + days * 864e5)
    : new Date(Date.now() + days * 864e5);

  shop.planExpiry = newExpiry;
  return await shop.save();
};
