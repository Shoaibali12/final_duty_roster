const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for frontend (http://localhost:3000)
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true, // if you need cookies/auth headers
  })
);

app.use(express.json());

// Routes
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const testEventRoutes = require("./routes/testEvent.routes");
const testCentreRoutes = require("./routes/testCentre.routes");
const staticRoleAssignmentRoutes = require("./routes/staticRoleAssignment.routes");
const sectionRoutes = require("./routes/section.routes");
const roomRoutes = require("./routes/room.routes");
const performanceFeedbackRoutes = require("./routes/performanceFeedback.routes");
const notificationRoutes = require("./routes/notification.routes");
const dutyAssignmentRoutes = require("./routes/dutyAssignment.routes");
const blockRoutes = require("./routes/block.routes");
const attendanceRecordRoutes = require("./routes/attendanceRecord.routes");
const venueConfigRoutes = require("./routes/venueConfig.routes");
const supportRoleRoutes = require("./routes/supportRole.routes"); // ← new

// Register
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/testCenter", testCentreRoutes);
app.use("/api/staticRoleAssignment", staticRoleAssignmentRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/performanceFeedback", performanceFeedbackRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/dutyAssignment", dutyAssignmentRoutes);
app.use("/api/block", blockRoutes);
app.use("/api/attendanceRecord", attendanceRecordRoutes);
app.use("/api/test-events", testEventRoutes);
app.use("/api/venue-config", venueConfigRoutes);
app.use("/api/supportRoles", supportRoleRoutes); // ← new
module.exports = app;
