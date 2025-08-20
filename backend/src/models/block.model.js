const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema({
  centreId: {
    type: Schema.Types.ObjectId,
    ref: "TestCentre",
    required: true,
  },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Block", blockSchema);
