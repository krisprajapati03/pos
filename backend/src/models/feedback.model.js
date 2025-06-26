import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    isResolved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending"
    },
    response: {
      type: String
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;