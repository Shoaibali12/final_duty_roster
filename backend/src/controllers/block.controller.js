// 5. Block Controller
const Block = require("../models/block.model");

exports.createBlock = async (req, res) => {
  try {
    const block = await Block.create(req.body);
    res.status(201).json(block);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await Block.find();
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
