const express = require("express");
const sectionController = require("../controllers/section.controller");
const router = express.Router();
router.post("/add-section", sectionController.createSection);
router.get("/get-section", sectionController.getAllSections);
module.exports = router;
