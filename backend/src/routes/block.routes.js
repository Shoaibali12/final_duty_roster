const express = require("express");
const blockController = require("../controllers/block.controller");
const router = express.Router();
router.post("/add-block", blockController.createBlock);
router.get("/add-block", blockController.getAllBlocks);
module.exports = router;
