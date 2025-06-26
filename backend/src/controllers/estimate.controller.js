import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createEstimateService,
  getEstimateListService,
} from "../services/estimate.service.js";

export const createEstimate = wrapAsync(async (req, res) => {
  const estimate = await createEstimateService({ ...req.body, shopId: req.user.shopId });
  res.status(200).json({ message: "Estimate created", estimate });
});

export const getEstimates = wrapAsync(async (req, res) => {
  const estimates = await getEstimateListService(req.user.shopId);
  res.status(200).json({ estimates });
});
