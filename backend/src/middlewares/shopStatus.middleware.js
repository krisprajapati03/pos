import { Shop } from "../models/shop.model.js";

export const checkShopStatus = async (req, res, next) => {
  const shopId = req.user.shopId;
  if (!shopId) return res.status(403).json({ success: false, message: "No shop context" });

  const shop = await Shop.findById(shopId).select("isActive planExpiry");
  if (!shop || !shop.isActive) {
    return res.status(403).json({ success: false, message: "Shop account is disabled" });
  }
  if (shop.planExpiry && new Date() > shop.planExpiry) {
    return res.status(403).json({ success: false, message: "Shop plan has expired" });
  }

  next();
};
