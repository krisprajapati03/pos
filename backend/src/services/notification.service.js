import {
  createNotificationDao,
  getMyNotificationsDao,
  markNotificationAsReadDao,
  deleteNotificationDao
} from "../dao/notification.dao.js";

export const createNotificationService = async (data, shopId) => {
  return await createNotificationDao({ ...data, shopId });
};

export const getMyNotificationsService = async (userId) => {
  return await getMyNotificationsDao(userId);
};

export const markNotificationAsReadService = async (id) => {
  return await markNotificationAsReadDao(id);
};

export const deleteNotificationService = async (id) => {
  return await deleteNotificationDao(id);
};
