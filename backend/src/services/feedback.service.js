import {
  createFeedbackDao,
  getAllFeedbacksDao,
  getFeedbackByIdDao,
  updateFeedbackStatusDao
} from "../dao/feedback.dao.js";

export const createFeedbackService = async (data, userId, shopId) => {
  return await createFeedbackDao({ ...data, userId, shopId });
};

export const getAllFeedbacksService = async (shopId) => {
  return await getAllFeedbacksDao(shopId);
};

export const getFeedbackByIdService = async (id, shopId) => {
  return await getFeedbackByIdDao(id, shopId);
};

export const updateFeedbackStatusService = async (id, status, response, shopId) => {
  return await updateFeedbackStatusDao(id, status, response, shopId);
};
