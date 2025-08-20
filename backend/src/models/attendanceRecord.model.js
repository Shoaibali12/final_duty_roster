const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema({
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
  checkInTime: Date,
  checkOutTime: Date,
  verificationMethod: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AttendanceRecord", attendanceRecordSchema);
