
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    isActive: { type: Boolean, default: true },
    plan: {
        type: String,
        enum: ["free", "basic", "premium"],
        default: "free"
    },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }, 
    address: { type : String, default: "" },
    profilePicture: { type: String, default: "" }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);