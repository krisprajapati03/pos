import mongoose from 'mongoose';
// Notification Model
const notificationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        type: { type: String, enum: ['info', 'warning', 'error'], default: 'info' },
        data: { type: mongoose.Schema.Types.Mixed },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;