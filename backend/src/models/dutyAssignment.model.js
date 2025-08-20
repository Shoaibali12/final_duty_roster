const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dutyAssignmentSchema = new Schema({
    testEventId: {
        type: Schema.Types.ObjectId,
        ref: "TestEvent",
        required: true,
    },
    staffId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    assignedCentreId: {
        type: Schema.Types.ObjectId,
        ref: "TestCentre",
        required: true,
    },
    assignedBlockId: { type: Schema.Types.ObjectId, ref: "Block" },
    assignedSectionId: { type: Schema.Types.ObjectId, ref: "Section" },
    assignedRoomId: { type: Schema.Types.ObjectId, ref: "Room" },
    status: {
        type: String,
        enum: ["Assigned", "Accepted", "Rejected", "Completed"],
        default: "Assigned",
    },
    swapRequestMadeBy: { type: Schema.Types.ObjectId, ref: "User" },
    replacedByStaffId: { type: Schema.Types.ObjectId, ref: "User" },
    isApproved: Boolean,
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvalDate: Date,
    checklist: [
        {
            item: String,
            isCompleted: Boolean,
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("DutyAssignment", dutyAssignmentSchema);