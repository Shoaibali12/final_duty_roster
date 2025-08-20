// 8. Test Event Controller
const TestEvent = require("../models/testEvent.model");

// const TestEvent = require("../models/testEvent.model");

exports.createTestEvent = async (req, res) => {
    try {
        const {
            testTitle,
            testDate,
            totalApplicants,
            instructions,
            overallTestInchargeId,
            overallCentreInchargeMainId,
            overallCentreInchargeSubId,
            testingAdministratorsIds,
        } = req.body;

        const newTestEvent = new TestEvent({
            eventName: testTitle,
            eventDate: testDate,
            totalApplicants,
            dutyInstructions: instructions,
            overallTestInchargeId,
            overallCentreInchargeMainId,
            overallCentreInchargeSubId,
            testingAdministratorsIds,
        });

        const savedEvent = await newTestEvent.save();
        res.status(201).json({
            message: "Test event saved successfully!",
            eventId: savedEvent._id,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllTestEvents = async (req, res) => {
  try {
    const events = await TestEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
