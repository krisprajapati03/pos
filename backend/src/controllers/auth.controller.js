import wrapAsync from "../utils/tryCatchWapper.js";
import { registerUser, loginUser, shopLoginService } from "../services/auth.service.js";
import { getUserByIdDao } from "../dao/auth.dao.js";
import { connectDB } from "../config/db.js";  
import { cookieOptions } from "../config/config.js";  // ✅ Import cookie config

export const register = wrapAsync(async (req, res) => {
  await connectDB();  // ✅ Connect DB
  const { user, token } = await registerUser(req.body);
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({ message: "Registered", user });
});

export const login = wrapAsync(async (req, res) => {
  await connectDB();  // ✅ Connect DB
  const { user, token } = await loginUser(req.body);
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "Logged in", user });
});

export const shopLoginController = wrapAsync(async (req, res) => {
  await connectDB();  // ✅ Connect DB
  const { user, token } = await shopLoginService(req.body);
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "staff logged in", user });
});

export const logout = wrapAsync(async (req, res) => {
  await connectDB();  // ✅ Connect DB
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out" });
});

export const profile = wrapAsync(async (req, res) => {
  await connectDB();  // ✅ Connect DB
  const user = await getUserByIdDao(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});
