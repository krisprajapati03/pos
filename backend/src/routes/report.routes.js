// import express from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
// import { getDailyReport, getMonthlyReport, getCustomReport } from "../controllers/report.controller.js";

// const router = express.Router();

// router.get("/daily", authMiddleware, getDailyReport);
// router.get("/monthly", authMiddleware, getMonthlyReport);
// router.get("/custom", authMiddleware, getCustomReport);

// export default router;


// In report.routes.js
import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getReportSummary,
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getReportSummary);

export default router;
