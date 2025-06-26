import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "cashier", "kitchen", "waiter"],
      required: true,
    },
    phone: {
      type: String,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);