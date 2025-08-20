const express = require("express");
const router = express.Router();
const supportRoleController = require("../controllers/SupportRole.controller");

// Create support roles for a block
router.post("/add", supportRoleController.addSupportRoles);

// Get all support roles for a block
router.get("/block/:blockId", supportRoleController.getSupportRolesByBlock);

// Update a specific support role
router.put("/:id", supportRoleController.updateSupportRole);

// Delete a specific support role
router.delete("/:id", supportRoleController.deleteSupportRole);

module.exports = router;
