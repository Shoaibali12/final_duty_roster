const mongoose = require("mongoose");

const performanceFeedbackSchema = new mongoose.Schema({
  dutyAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DutyAssignment",
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  raterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5 },
  comments: String,
  feedbackDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "PerformanceFeedback",
  performanceFeedbackSchema
);
