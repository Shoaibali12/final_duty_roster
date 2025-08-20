const TestEvent = require("../models/testEvent.model");
const TestCentre = require("../models/testCentre.model");
const Block = require("../models/block.model");
const Section = require("../models/section.model");
const Room = require("../models/room.model");
const SupportRole = require("../models/supportRole.model");

exports.addVenueConfiguration = async (req, res) => {
  try {
    const { eventId, venueType, venueName, block, sections, supportRoles } =
      req.body;

    // 1. Find or create the TestCentre
    let testCentre = await TestCentre.findOneAndUpdate(
      { name: venueName },
      { type: venueType },
      { new: true, upsert: true, runValidators: true }
    );

    // 2. Find or create the Block, linking it to the TestCentre
    let newBlock = await Block.findOneAndUpdate(
      { name: block, centreId: testCentre._id },
      { centreId: testCentre._id },
      { new: true, upsert: true, runValidators: true }
    );

    // 3. Insert support roles for this block, if provided
    if (supportRoles && supportRoles.length) {
      const supportRoleDocs = supportRoles.map((role) => ({
        blockId: newBlock._id,
        role: role.role,
        count: role.count,
      }));
      await SupportRole.insertMany(supportRoleDocs);
    }

    // 4. Update the TestEvent with the overall venue ID
    await TestEvent.findByIdAndUpdate(eventId, {
      overallVenueId: testCentre._id,
    });

    // 5. Create sections and rooms
    const createdSections = [];
    for (const sectionData of sections) {
      const newSection = await Section.findOneAndUpdate(
        { name: `Section ${sectionData.sectionNo}`, blockId: newBlock._id },
        { blockId: newBlock._id },
        { new: true, upsert: true, runValidators: true }
      );

      // Remove existing rooms in this section (if any)
      await Room.deleteMany({ sectionId: newSection._id });

      // Insert rooms
      const roomDocuments = sectionData.rooms.map((room) => ({
        sectionId: newSection._id,
        roomName: `Room ${room.roomNo}`,
        capacity: room.capacity,
      }));

      await Room.insertMany(roomDocuments);
      createdSections.push(newSection);
    }

    res.status(201).json({
      message: "Venue configuration saved successfully!",
      testCentreId: testCentre._id,
      blockId: newBlock._id,
      sectionsCreated: createdSections.length,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
