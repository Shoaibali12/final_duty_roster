const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dutyInstructionSchema = new Schema({
    role: String,
    content: String,
});

const testEventSchema = new Schema({
    eventName: { type: String, required: true, unique: true },
    eventDate: { type: Date, required: true },
    totalApplicants: { type: Number, required: true },
    dutyInstructions: [dutyInstructionSchema],
    
    // Additional fields from your original model:
    reportingTime: String,
    testDurationMinutes: Number,
    breaks: [
        {
            startTime: String,
            endTime: String,
            description: String,
        },
    ],
    transportTiming: String,
    overallVenueId: { type: Schema.Types.ObjectId, ref: "TestCentre" },
    status: {
        type: String,
        enum: ["Planned", "Active", "Completed", "Cancelled"],
        default: "Planned",
    },
    // The static roles are now handled as part of the TestEvent
    overallTestInchargeId: { type: Schema.Types.ObjectId, ref: "User" },
    overallTestCentreInchargeMainId: { type: Schema.Types.ObjectId, ref: "User" },
    overallTestCentreInchargeSubId: { type: Schema.Types.ObjectId, ref: "User" },
    testAdministratorsIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("TestEvent", testEventSchema);