import mongoose from "mongoose";

const estimateSchema = new mongoose.Schema(
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
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
        price: Number,
        total: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Estimate", estimateSchema);
