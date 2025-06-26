import { createMoneyOutDao, getMoneyOutListDao } from "../dao/moneyOut.dao.js";

export const createMoneyOutService = async (data) => {
  return await createMoneyOutDao(data);
};

export const getMoneyOutListService = async (shopId) => {
  return await getMoneyOutListDao(shopId);
};