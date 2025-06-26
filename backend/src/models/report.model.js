import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["daily", "monthly", "custom"],
      required: true,
    },
    dateRange: {
      start: Date,
      end: Date,
    },
    sale: Number,
    purchase: Number,
    expense: Number,
    profit: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
