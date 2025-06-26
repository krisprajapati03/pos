import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createNotificationService,
  getMyNotificationsService,
  markNotificationAsReadService,
  deleteNotificationService
} from "../services/notification.service.js";

export const createNotification = wrapAsync(async (req, res) => {
  const notification = await createNotificationService(req.body, req.user.shopId);
  res.status(201).json({ message: "Notification sent", notification });
});

export const getMyNotifications = wrapAsync(async (req, res) => {
  const notifications = await getMyNotificationsService(req.user._id);
  res.status(200).json({ notifications });
});

export const markNotificationAsRead = wrapAsync(async (req, res) => {
  const updated = await markNotificationAsReadService(req.params.id);
  res.status(200).json({ message: "Marked as read", notification: updated });
});

export const deleteNotification = wrapAsync(async (req, res) => {
  await deleteNotificationService(req.params.id);
  res.status(200).json({ message: "Notification deleted" });
});
