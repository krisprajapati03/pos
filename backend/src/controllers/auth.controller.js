import wrapAsync from "../utils/tryCatchWapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { getUserByIdDao } from "../dao/auth.dao.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const register = wrapAsync(async (req, res) => {
  const { user, token } = await registerUser(req.body);
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({ message: "Registered", user });
});

export const login = wrapAsync(async (req, res) => {
  const { user, token } = await loginUser(req.body);
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "Logged in", user });
});

export const logout = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out" });
});

export const profile = wrapAsync(async (req, res) => {
  const user = await getUserByIdDao(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
});
