import { getReportData } from "../dao/report.dao.js";

export const fetchDailyReport = async (userId, date) => {
  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23, 59, 59);
  return await getReportData(userId, start, end);
};

export const fetchMonthlyReport = async (userId, month) => {
  const [year, m] = month.split("-");
  const start = new Date(`${year}-${m}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setDate(0);
  end.setHours(23, 59, 59);
  return await getReportData(userId, start, end);
};

export const fetchCustomReport = async (userId, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59);
  return await getReportData(userId, start, end);
};