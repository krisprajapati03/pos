import { Shop } from "../models/shop.model.js";

export const checkShopStatus = async (req, res, next) => {
  const shopId = req.user.shopId;
  //console.log("Checking shop status for shopId:", shopId);
  if (!shopId) return res.status(403).json({ success: false, message: "No shop context" });

  const shop = await Shop.findById(shopId).select("licenseStatus licenseExpiryDate");
  if (!shop || !shop.licenseStatus) {
    return res.status(403).json({ success: false, message: "Shop account is disabled" });
  }
  if (shop.licenseExpiryDate && new Date() > shop.licenseExpiryDate) {
    return res.status(403).json({ success: false, message: "Shop license has expired" });
  }

  next();
};
