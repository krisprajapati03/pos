import jwt from "jsonwebtoken";
import { User } from "../models/auth.model.js";
import { Shop } from "../models/shop.model.js";
import { connectDB } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  await connectDB();  // ✅ Ensure DB connection (Vercel-safe)

  const JWT_SECRET = process.env.JWT_SECRET;

  const token =
    req.cookies?.accessToken ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token" });
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid user" });
    }

    let shop = null;
    if (user.role === "admin") {
      shop = await Shop.findOne({ owner: user._id });
    } else {
      shop = await Shop.findById(user.shopId);
    }

    req.user = {
      _id: user._id,
      role: user.role,
      shopId: shop?._id || user.shopId || null,
    };

    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
