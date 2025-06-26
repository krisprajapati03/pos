import wrapAsync from "../utils/tryCatchWapper.js";
import {
  getAllShopsService,
  updateShopStatusService,
  extendShopPlanService
} from "../services/admin.service.js";

export const getAllShops = wrapAsync(async (req, res) => {
  const shops = await getAllShopsService();
  res.json({ success: true, shops });
});

export const updateShopStatus = wrapAsync(async (req, res) => {
  const updated = await updateShopStatusService(req.params.id, req.body.isActive);
  res.json({ success: true, message: "Shop status updated", shop: updated });
});

export const extendShopPlan = wrapAsync(async (req, res) => {
  const { days } = req.body;
  const updated = await extendShopPlanService(req.params.id, days);
  res.json({ success: true, message: "Shop plan extended", shop: updated });
});
