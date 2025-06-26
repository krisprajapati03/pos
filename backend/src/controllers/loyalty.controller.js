import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createLoyaltyPointService,
  getLoyaltyPointsByCustomerService,
  getAllLoyaltyPointsService
} from "../services/loyalty.service.js";

export const createLoyaltyPoint = wrapAsync(async (req, res) => {
  const loyalty = await createLoyaltyPointService(req.body, req.user.shopId);
  res.status(201).json({ message: "Loyalty point added", loyalty });
});

export const getLoyaltyPointsByCustomer = wrapAsync(async (req, res) => {
  const customerId = req.params.id;
  const loyalty = await getLoyaltyPointsByCustomerService(customerId, req.user.shopId);
  res.status(200).json({ loyalty });
});

export const getAllLoyaltyPoints = wrapAsync(async (req, res) => {
  const loyalty = await getAllLoyaltyPointsService(req.user.shopId);
  res.status(200).json({ loyalty });
});
