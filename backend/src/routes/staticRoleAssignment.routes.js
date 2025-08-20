// Static Role Assignments
const express = require("express");
const staticRoleController = require("../controllers/staticRoleAssignment.controller");
const router = express.Router();

router.post(
  "/add-staticRoleAssignment",
  staticRoleController.createStaticRoleAssignment
);
router.get(
  "/get-staticRoleAssignment",
  staticRoleController.getAllStaticRoleAssignments
);

module.exports = router;
