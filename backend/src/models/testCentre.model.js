const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testCentreSchema = new Schema({
 name: { type: String, unique: true, required: true },
 type: { type: String, enum: ["Campus", "External"], required: true },
 address: String,
 isActive: { type: Boolean, default: true },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestCentre", testCentreSchema);