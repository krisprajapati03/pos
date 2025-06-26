import {
  createLoyaltyPointDao,
  getLoyaltyPointsByCustomerDao,
  getAllLoyaltyPointsDao
} from "../dao/loyalty.dao.js";

export const createLoyaltyPointService = async (data, shopId) => {
  return await createLoyaltyPointDao({ ...data, shopId });
};

export const getLoyaltyPointsByCustomerService = async (customerId, shopId) => {
  return await getLoyaltyPointsByCustomerDao(customerId, shopId);
};

export const getAllLoyaltyPointsService = async (shopId) => {
  return await getAllLoyaltyPointsDao(shopId);
};
