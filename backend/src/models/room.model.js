const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
 sectionId: {
  type: Schema.Types.ObjectId,
  ref: "Section",
   required: true,
 },
 roomName: { type: String, required: true },
 capacity: { type: Number, required: true, min: 0 },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", roomSchema);