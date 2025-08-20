const express = require("express");
const feedbackController = require("../controllers/performanceFeedback.controller");
const router = express.Router();
router.post(
  "/add-performanceFeedback",
  feedbackController.createPerformanceFeedback
);
router.get(
  "/get-performanceFeedback",
  feedbackController.getAllPerformanceFeedback
);
module.exports = router;
