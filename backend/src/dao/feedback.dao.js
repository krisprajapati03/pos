import Feedback from "../models/feedback.model.js";

export const createFeedbackDao = async (data) => {
  return await Feedback.create(data);
};

export const getAllFeedbacksDao = async (shopId) => {
  return await Feedback.find({ shopId }).sort({ createdAt: -1 });
};

export const getFeedbackByIdDao = async (id, shopId) => {
  return await Feedback.findOne({ _id: id, shopId });
};

export const updateFeedbackStatusDao = async (id, status, response, shopId) => {
  return await Feedback.findOneAndUpdate(
    { _id: id, shopId },
    { status, response },
    { new: true }
  );
};
