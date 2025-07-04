import { User } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import Staff from "../models/staff.model.js";
import mongoose from "mongoose";


export const findUserByEmailDao = async (email) => {
  return await User.findOne({ email });
};

export const createUserDao = async (data) => {
  return await User.create(data);
};

export const getUserByIdDao = async (id) => {
  return await User.findById(id);
};

export const findShopUserByCredentials = async (shopId, email, password) => {
  
  const user = await Staff.findOne({
    shopId: new mongoose.Types.ObjectId(shopId),
    email,
  });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};