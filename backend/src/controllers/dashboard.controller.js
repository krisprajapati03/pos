import wrapAsync from "../utils/tryCatchWapper.js";
import { getDashboardSummaryService } from "../services/dashboard.service.js";

export const getDashboardSummary = wrapAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admins only" });
  }

  const summary = await getDashboardSummaryService(req.user.shopId);
  res.json({ success: true, summary });
});
