// app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import morgan from "morgan";

import adminRoutes from "./src/routes/admin.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import billRoutes from "./src/routes/bill.routes.js";
import customerRoutes from "./src/routes/customer.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import expenseRoutes from "./src/routes/expense.routes.js";
import feedbackRoutes from "./src/routes/feedback.routes.js";
import kotRoutes from "./src/routes/kot.routes.js";
import loyaltyRoutes from "./src/routes/loyalty.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import purchaseRoutes from "./src/routes/purchase.routes.js";
import stockRoutes from "./src/routes/stock.routes.js";
import tableRoutes from "./src/routes/table.routes.js";
import estimateRoutes from "./src/routes/estimate.routes.js";
import moneyInRoutes from "./src/routes/moneyIn.routes.js";
import moneyOutRoutes from "./src/routes/moneyOut.routes.js";
import staffRoutes from "./src/routes/staff.routes.js";
// import greetingRoutes from "./src/routes/greeting.routes.js";
import reportRoutes from "./src/routes/report.routes.js";
import shopRoutes from "./src/routes/shop.routes.js";
import supplierRoutes from "./src/routes/supplier.routes.js";
import dashboard from "./src/routes/dashboard.routes.js";

const app = express();
// Middleware
app.use(cookieParser());
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.VERCEL_CLIENT_URL,
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/kot", kotRoutes);
app.use("/api/loyalty", loyaltyRoutes); //
app.use("/api/notification", notificationRoutes); //
app.use("/api/product", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/estimate", estimateRoutes); //
app.use("/api/money-in", moneyInRoutes); //
app.use("/api/money-out", moneyOutRoutes); //
app.use("/api/staff", staffRoutes);
// app.use("/api/greeting", greetingRoutes);
app.use("/api/reports", reportRoutes); //
app.use("/api/shops", shopRoutes);
app.use("/api/dashboard", dashboard); 
// Hello World route for non-frontend usage
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handler
app.use(errorHandler);

// Logging
app.use(morgan('dev'));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ POS backend running at http://localhost:${PORT}`);
});
