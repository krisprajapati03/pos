import LoyaltyPoint from "../models/loyalty.model.js";

export const createLoyaltyPointDao = async (data) => {
  return await LoyaltyPoint.create(data);
};

export const getLoyaltyPointsByCustomerDao = async (customerId, shopId) => {
  return await LoyaltyPoint.find({ customerId, shopId }).sort({ transactionDate: -1 });
};

export const getAllLoyaltyPointsDao = async (shopId) => {
  return await LoyaltyPoint.find({ shopId }).populate("customerId").sort({ createdAt: -1 });
};
