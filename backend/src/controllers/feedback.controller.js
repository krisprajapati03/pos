import wrapAsync from "../utils/tryCatchWapper.js";
import {
  createFeedbackService,
  getAllFeedbacksService,
  getFeedbackByIdService,
  updateFeedbackStatusService
} from "../services/feedback.service.js";

export const createFeedback = wrapAsync(async (req, res) => {
  const feedback = await createFeedbackService(req.body, req.user._id, req.user.shopId);
  res.status(201).json({ message: "Feedback submitted", feedback });
});

export const getAllFeedbacks = wrapAsync(async (req, res) => {
  const feedbacks = await getAllFeedbacksService(req.user.shopId);
  res.status(200).json({ feedbacks });
});

export const getFeedbackById = wrapAsync(async (req, res) => {
  const feedback = await getFeedbackByIdService(req.params.id, req.user.shopId);
  res.status(200).json({ feedback });
});

export const updateFeedbackStatus = wrapAsync(async (req, res) => {
  const { status, response } = req.body;
  const updated = await updateFeedbackStatusService(req.params.id, status, response, req.user.shopId);
  res.status(200).json({ message: "Feedback status updated", feedback: updated });
});
