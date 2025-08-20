const express = require("express");
const notificationController = require("../controllers/notification.controller");
const router = express.Router();
router.post("/add-notification", notificationController.createNotification);
router.get("/get-notification", notificationController.getAllNotifications);
module.exports = router;
