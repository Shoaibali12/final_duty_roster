const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
 blockId: {
  type: Schema.Types.ObjectId,
   ref: "Block",
  required: true,
  },
 name: { type: String, required: true },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Section", sectionSchema);