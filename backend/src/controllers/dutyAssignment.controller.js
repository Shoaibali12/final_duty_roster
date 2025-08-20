const DutyAssignment = require("../models/dutyAssignment.model");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const Block = require("../models/block.model");
const Section = require("../models/section.model");
const Room = require("../models/room.model");

exports.generateAssignments = async (req, res) => {
  try {
    const { eventId, overallVenueId } = req.body;

    const allUsers = await User.find({ isAvailableForDuty: true });
    const allRoles = await Role.find({});
    const rolesMap = new Map(allRoles.map((role) => [role.roleName, role._id]));

    const designationScores = {
      Director: 6,
      Professor: 5,
      "Associate Professor": 4,
      "Assistant Professor": 3,
      Staff: 2,
    };

    const sortedUsers = allUsers.sort((a, b) => {
      const scoreA =
        (a.experienceYears || 0) + (designationScores[a.designation] || 0);
      const scoreB =
        (b.experienceYears || 0) + (designationScores[b.designation] || 0);
      return scoreB - scoreA;
    });

    const assignedUserIds = new Set();
    const assignmentsToCreate = [];

    const assignUser = (roleName, locationId, locationType) => {
      const roleId = rolesMap.get(roleName);
      if (!roleId) return null;

      // Find the most senior unassigned user
      const assignedUser = sortedUsers.find(
        (user) => !assignedUserIds.has(user._id.toString())
      );
      if (assignedUser) {
        assignedUserIds.add(assignedUser._id.toString());
        const assignment = {
          testEventId: eventId,
          staffId: assignedUser._id,
          roleId: roleId,
          assignedCentreId: overallVenueId,
          [locationType]: locationId,
        };
        assignmentsToCreate.push(assignment);
        return assignedUser._id;
      }
      return null;
    };

    // --- Assign Hierarchical Roles ---
    const blocks = await Block.find({ centreId: overallVenueId });
    blocks.forEach((block) =>
      assignUser("Block Supervisors", block._id, "assignedBlockId")
    );

    // --- Assign Random Roles (Invigilators) ---
    const rooms = await Room.find({
      sectionId: await Section.find({ blockId: blocks.map((b) => b._id) }).then(
        (s) => s.map((sec) => sec._id)
      ),
    });
    const unassignedInvigilatorPool = allUsers.filter(
      (user) => !assignedUserIds.has(user._id.toString())
    );
    const shuffledInvigilators = unassignedInvigilatorPool.sort(
      () => 0.5 - Math.random()
    );

    const invigilatorRoleId = rolesMap.get("Invigilators");
    if (invigilatorRoleId) {
      rooms.forEach((room, index) => {
        const invigilator = shuffledInvigilators[index];
        if (invigilator) {
          assignedUserIds.add(invigilator._id.toString());
          assignmentsToCreate.push({
            testEventId: eventId,
            staffId: invigilator._id,
            roleId: invigilatorRoleId,
            assignedCentreId: overallVenueId,
            assignedBlockId: room.blockId,
            assignedSectionId: room.sectionId,
            assignedRoomId: room._id,
          });
        }
      });
    }

    // --- Assign Other Support Staff (Non-Location Specific) ---
    const supportRoles = [
      "Pre-Test Coordination Team",
      "Post-Test Coordination Team",
      "ICT Staff",
      "Transportation Staff",
      "Security Staff",
      "Health Staff (Medical/First Aid)",
      "Marketing Staff (Branding, Communication)",
      "Engineering Staff (Power, Equipment)",
      "Janitorial Staff (Cleanliness)",
    ];

    const unassignedStaffPool = allUsers.filter(
      (user) => !assignedUserIds.has(user._id.toString())
    );

    supportRoles.forEach((roleName) => {
      const roleId = rolesMap.get(roleName);
      if (roleId) {
        const assignedUser = unassignedStaffPool.shift();
        if (assignedUser) {
          assignedUserIds.add(assignedUser._id.toString());
          assignmentsToCreate.push({
            testEventId: eventId,
            staffId: assignedUser._id,
            roleId: roleId,
            assignedCentreId: overallVenueId,
          });
        }
      }
    });

    if (assignmentsToCreate.length > 0) {
      await DutyAssignment.insertMany(assignmentsToCreate);
    }

    res.status(200).json({
      message: "Assignments generated successfully!",
      assignmentsCreated: assignmentsToCreate.length,
    });
  } catch (error) {
    console.error("Error generating assignments:", error);
    res.status(500).json({
      message: "Failed to generate assignments.",
      error: error.message,
    });
  }
};

// In your dutyAssignment.controller.js file

exports.getAllDutyAssignments = async (req, res) => {
  try {
    const duties = await DutyAssignment.find()
      .populate("staffId", "firstName lastName employeeId designation")
      .populate("roleId", "roleName")
      .populate("assignedCentreId", "name")
      .populate("assignedBlockId", "name")
      .populate("assignedSectionId", "name")
      .populate("assignedRoomId", "roomName capacity");

    res.json(duties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
