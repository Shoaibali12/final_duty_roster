// 4. Test Centre Controller
const TestCentre = require("../models/testCentre.model");

exports.createTestCentre = async (req, res) => {
  try {
    const centre = await TestCentre.create(req.body);
    res.status(201).json(centre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTestCentres = async (req, res) => {
  try {
    const centres = await TestCentre.find();
    res.json(centres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
