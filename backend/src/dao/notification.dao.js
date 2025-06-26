import Notification from "../models/notification.model.js";

export const createNotificationDao = async (data) => {
  return await Notification.create(data);
};

export const getMyNotificationsDao = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

export const markNotificationAsReadDao = async (id) => {
  return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
};

export const deleteNotificationDao = async (id) => {
  return await Notification.findByIdAndDelete(id);
};
