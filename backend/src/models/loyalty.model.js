import mongoose from "mongoose";

const loyaltySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    lastTransaction: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Loyalty = mongoose.model("Loyalty", loyaltySchema);
export default Loyalty;
