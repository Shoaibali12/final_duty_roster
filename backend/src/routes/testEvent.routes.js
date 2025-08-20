const express = require("express");
const testEventController = require("../controllers/testEvent.controller");
const router = express.Router();
router.post("/save-or-update", testEventController.createTestEvent)
router.get("/get-testEvent", testEventController.getAllTestEvents);
module.exports = router;
