// User Model
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    password: { type: String, required: true },
    role: { type: String, enum: ["provider", "admin", "staff", "cashier"], default: "admin" },
    // shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);