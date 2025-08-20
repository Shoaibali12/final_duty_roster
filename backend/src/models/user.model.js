const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    employeeId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    // Use an enum for designations to ensure consistency
    designation: { 
        type: String, 
        enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Director', 'Staff'], 
        required: true 
    },

    experienceYears: { type: Number, min: 0, default: 0 },
  
    isAvailableForDuty: { type: Boolean, default: true },
  
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;