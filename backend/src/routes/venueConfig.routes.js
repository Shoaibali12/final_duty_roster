// routes/venueConfig.routes.js
const express = require("express");
const venueConfigController = require("../controllers/venueConfig"); // Correctly point to the controller

const router = express.Router();

// Route to handle adding venue configuration
router.post("/add-venue", venueConfigController.addVenueConfiguration);

module.exports = router;