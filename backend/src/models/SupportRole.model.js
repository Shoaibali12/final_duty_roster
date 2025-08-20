const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supportRoleSchema = new Schema({
  blockId: {
    type: Schema.Types.ObjectId,
    ref: "Block",
    required: true,
  },
  role: { type: String, required: true },
  count: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if model exists before creating
module.exports =
  mongoose.models.SupportRole ||
  mongoose.model("SupportRole", supportRoleSchema);
