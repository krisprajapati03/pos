import { User } from "../models/auth.model.js";

export const findUserByEmailDao = async (email) => {
  return await User.findOne({ email });
};

export const createUserDao = async (data) => {
  return await User.create(data);
};

export const getUserByIdDao = async (id) => {
  return await User.findById(id);
};
