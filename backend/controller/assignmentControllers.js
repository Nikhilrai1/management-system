const asyncHandler = require("express-async-handler");
const Assignment = require("../model/Assignment");
const Teacher = require("../model/Teacher");



// -------------------------createAssignment--------------------------
const createAssignment = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) return res.status(401).json({ success: false, message: "UnAuthorized"})

    // create new assignment in mongodb database
    const newAssignment = await Assignment.create({...req.body,creatorName: teacher.fullname, creatorProfile: teacher.profile, creatorEmail: teacher.email })
    if(!newAssignment) res.status(400).json({ success: false, message: "Couldn't create new assignment"})
    res.status(200).json({ success: true,newAssignment})
})

// -------------------------getAllAssignment--------------------------
const getAllAssignment = asyncHandler(async (req, res) => {
    console.log("hello")
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) return res.status(401).json({ success: false, message: "UnAuthorized"})

    // get assignment from mongodb database
    const assignment = await Assignment.find()
    if(!assignment) res.status(400).json({ success: false, message: "Couldn't create new assignment"})
    res.status(200).json({ success: true,assignment})
})

module.exports = {
   createAssignment,
   getAllAssignment
}