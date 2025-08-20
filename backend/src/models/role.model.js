const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, unique: true },
  roleDescription: String,
  roleType: { type: String, enum: ["Static", "Dynamic"], required: true },
  permissions: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Role", roleSchema);
