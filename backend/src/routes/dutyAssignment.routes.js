const express = require("express");
const dutyAssignment = require("../controllers/dutyAssignment.controller");
const router = express.Router();
router.post("/generate-assignments", dutyAssignment.generateAssignments);
router.get("/get-dutyAssignment", dutyAssignment.getAllDutyAssignments);
module.exports = router;
