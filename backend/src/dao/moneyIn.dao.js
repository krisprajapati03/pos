import MoneyIn from "../models/moneyIn.model.js";

export const createMoneyInDao = async (data) => {
  return await MoneyIn.create(data);
};

export const getMoneyInListDao = async (shopId) => {
  return await MoneyIn.find({ shopId });
};