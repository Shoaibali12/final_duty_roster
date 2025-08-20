// 12. Performance Feedback Controller
const PerformanceFeedback = require("../models/performanceFeedback.model");

exports.createPerformanceFeedback = async (req, res) => {
  try {
    const feedback = await PerformanceFeedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPerformanceFeedback = async (req, res) => {
  try {
    const feedbacks = await PerformanceFeedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
