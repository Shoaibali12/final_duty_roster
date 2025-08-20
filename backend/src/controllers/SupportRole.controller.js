const SupportRole = require("../models/SupportRole.model");

exports.addSupportRoles = async (req, res) => {
  try {
    const { blockId, supportRoles } = req.body; // [{ role, count }]
    const roles = supportRoles.map((r) => ({ blockId, ...r }));
    const createdRoles = await SupportRole.insertMany(roles);
    res.status(201).json(createdRoles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSupportRolesByBlock = async (req, res) => {
  try {
    const roles = await SupportRole.find({ blockId: req.params.blockId });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSupportRole = async (req, res) => {
  try {
    const updatedRole = await SupportRole.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSupportRole = async (req, res) => {
  try {
    await SupportRole.findByIdAndDelete(req.params.id);
    res.json({ message: "Support role deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
