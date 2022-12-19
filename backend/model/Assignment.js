const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    studyLevel: { type: String, required: true },
    stream: { type: String, required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    files: { type: Array, default: []},
    creatorName: { type: String, required: true},
    creatorProfile: { type: String, default: ""},
    creatorEmail: { type: String, required: true},
}, { timestamps: true });

const Assignment = new mongoose.model("Assignment",AssignmentSchema);

module.exports = Assignment;