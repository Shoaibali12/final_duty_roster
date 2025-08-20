const StaticRoleAssignment = require('../models/staticRoleAssignment.model');

exports.createStaticRoleAssignment = async (req, res) => {
  try {
    const assignment = await StaticRoleAssignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllStaticRoleAssignments = async (req, res) => {
  try {
    const assignments = await StaticRoleAssignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};