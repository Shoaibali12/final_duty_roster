const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, enum: ["SMS", "Email", "Push Notification"] },
  message: String,
  sentAt: Date,
  isRead: { type: Boolean, default: false },
  dutyAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DutyAssignment",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
