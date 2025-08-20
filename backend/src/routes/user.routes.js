const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// Specific routes must come first
router.post("/add-user", userController.createUser);
router.get("/get-user", userController.getAllUsers);

// Dynamic routes should come after
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
