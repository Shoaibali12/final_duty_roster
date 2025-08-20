// routes/role.routes.js
const express = require("express");
const roleController = require("../controllers/role.controller");
const router = express.Router();

// CORRECTED LINE: Point to createOrUpdateRole
router.post("/add-role", roleController.createOrUpdateRole);

router.get("/get-role", roleController.getAllRoles);

router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
router.post("/bulk-add", roleController.createOrUpdateMultipleRoles); // This one is already correct
module.exports = router;