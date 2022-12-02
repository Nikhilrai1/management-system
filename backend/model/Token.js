const mongoose = require("mongoose")

const StudentTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
})

const TeacherTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Teacher",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
})

const StudentToken = new mongoose.model("StudentToken",StudentTokenSchema);
const TeacherToken = new mongoose.model("TeacherToken",TeacherTokenSchema);

module.exports = {StudentToken, TeacherToken};