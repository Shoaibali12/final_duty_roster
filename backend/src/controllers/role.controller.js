// controllers/role.controller.js
const Role = require("../models/role.model");

// Create a new role


exports.createOrUpdateRole = async (req, res) => {
  try {
      const { roleName, ...rest } = req.body;
      if (!roleName) {
          return res.status(400).json({ message: "roleName is required." });
      }

      const role = await Role.findOneAndUpdate(
          { roleName: roleName },
          { ...rest, roleName: roleName }, // Use spread operator to include all fields
          {
              new: true, // Return the updated document
              upsert: true, // Create a new document if one isn't found
              runValidators: true // Run schema validators on the update
          }
      );
      res.status(201).json(role);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

// Create or Update multiple roles at once based on roleName
exports.createOrUpdateMultipleRoles = async (req, res) => {
  try {
      const roles = req.body; // Expects an array of role objects
      if (!Array.isArray(roles) || roles.length === 0) {
          return res.status(400).json({ message: "Request body must be a non-empty array of roles." });
      }

      const bulkOperations = roles.map(role => ({
          updateOne: {
              filter: { roleName: role.roleName },
              update: role,
              upsert: true
          }
      }));

      const result = await Role.bulkWrite(bulkOperations);

      res.status(201).json({ 
          message: `${result.upsertedCount} roles created and ${result.modifiedCount} roles updated.`,
          result 
      });
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};


// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single role by its ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing role
exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
        });
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json(role);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json({ message: "Role deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};