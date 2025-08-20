// 11. Attendance Record Controller
const AttendanceRecord = require("../models/attendanceRecord.model");

exports.createAttendanceRecord = async (req, res) => {
  try {
    const record = await AttendanceRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllAttendanceRecords = async (req, res) => {
  try {
    const records = await AttendanceRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
