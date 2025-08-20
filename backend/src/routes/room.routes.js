const express = require("express");
const roomController = require("../controllers/room.controller");
const router = express.Router();
router.post("/add-room", roomController.createRoom);
router.get("/get-room", roomController.getAllRooms);
module.exports = router;
