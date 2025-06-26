import jwt from "jsonwebtoken";
import { User } from "../models/auth.model.js";
import { Shop } from "../models/shop.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "No token" });

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).select("-password");

    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    let shop = null;

    // Only fetch shop if user is an owner
    if (user.role === "admin") {
      shop = await Shop.findOne({ owner: user._id });
    }

    req.user = {
      _id: user._id,
      role: user.role,
      shopId: shop?._id || null, // Null if not owner
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
