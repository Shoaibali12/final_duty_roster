const express = require("express");
const testCentreController = require("../controllers/testCentre.controller");
const router = express.Router();
router.post("/add-testCentre", testCentreController.createTestCentre);
router.get("/get-testCentre", testCentreController.getAllTestCentres);
module.exports = router;
