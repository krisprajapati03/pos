import wrapAsync from "../utils/tryCatchWapper.js";
import { fetchDailyReport, fetchMonthlyReport, fetchCustomReport } from "../services/report.service.js";

export const getDailyReport = wrapAsync(async (req, res) => {
  const date = req.query.date;
  const data = await fetchDailyReport(req.user._id, date);
  res.status(200).json(data);
});

export const getMonthlyReport = wrapAsync(async (req, res) => {
  const month = req.query.month;
  const data = await fetchMonthlyReport(req.user._id, month);
  res.status(200).json(data);
});

export const getCustomReport = wrapAsync(async (req, res) => {
  const { start, end } = req.query;
  const data = await fetchCustomReport(req.user._id, start, end);
  res.status(200).json(data);
});