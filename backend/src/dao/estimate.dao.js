import Estimate from "../models/estimate.model.js";

export const createEstimateDao = async (data) => {
  return await Estimate.create(data);
};

export const getEstimatesDao = async (shopId) => {
  return await Estimate.find({ shopId });
};  