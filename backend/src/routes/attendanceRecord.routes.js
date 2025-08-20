const express = require("express");
const attendanceController = require("../controllers/attendanceRecord.controller");
const router = express.Router();
router.post(
  "/add-attendanceRecord",
  attendanceController.createAttendanceRecord
);
router.get(
  "/get-attendanceRecord",
  attendanceController.getAllAttendanceRecords
);
module.exports = router;
