const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");
const Parents = require("../model/Parents");



// -------------------------getAllStudents--------------------------
const getAllStudents = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    const students = await Student.find().select("-password").exec()
    res.status(200).json({ success: true, students })
})

// -------------------------deleteStudents--------------------------
const deleteStudent = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    if (!req.params.studentId) return res.status(400).json({ success: false, message: "Required Student id" })
    const student = await Student.findById(req.params.studentId);

    if (!student) res.status(404).json({ success: false, message: "Student Not Found!!!" })
    const deleteStudent = await Student.findByIdAndDelete(req.params.studentId);
    res.status(200).json({ success: true, message: `student ${deleteStudent.fullname} account is deleted successfully.` })
})


// -------------------------getAllTeachers--------------------------
const getAllTeachers = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    const teachers = await Teacher.find();
    res.status(200).json({ success: true, teachers })
})

// -------------------------deleteTeacher--------------------------
const deleteTeacher = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    if (!req.params.teacherId) return res.status(400).json({ success: false, message: "Required teacher id" })
    const teacher = await Teacher.findById(req.params.teacherId);

    if (!teacher) res.status(404).json({ success: false, message: "teacher Not Found!!!" })
    const deleteTeacher = await Teacher.findByIdAndDelete(req.params.teacherId);
    res.status(200).json({ success: true, message: `Teacher ${deleteTeacher.fullname} account is deleted successfully.` })
})

// -------------------------getAllStudents--------------------------
const getAllParents = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    const parents = await Parents.find();
    res.status(200).json({ success: true, parents })
})

// -------------------------deleteStudents--------------------------
const deleteParents = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    if (!req.params.parentsId) return res.status(400).json({ success: false, message: "Required Parents id" })
    const parents = await Parents.findById(req.params.parentsId);

    if (!parents) res.status(404).json({ success: false, message: "parents Not Found!!!" })
    const deleteParents = await Parents.findByIdAndDelete(req.params.parentsId);
    res.status(200).json({ success: true, message: `parents ${deleteParents.fullname} account is deleted successfully.` })
})



const updateUser = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    console.log(req.body)
    const { _id, role, ...updateData} = req.body;
    console.log(updateData)
    console.log(role)
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })
    if (!role) return res.status(400).json({ success: false, message: "Require user role" })

    // update callback function
    function updateCallback(err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Updated User : ", docs);
        }
    }

    // logic here
    let user;
    let updateUser;
    if (role === "student") {
        user = await Student.findById(_id);
        if (!user) return res.status(400).json({ success: false, message: "student not found" })
        updateUser = await Student.findByIdAndUpdate(user._id, { ...updateData }); // make sure to destructure updateData else give error
    }
    else if (role === "teacher" || role === "Admin") {
        user = await Teacher.findById(_id);
        if (!user) return res.status(400).json({ success: false, message: "teacher not found" })
        updateUser = await Teacher.findByIdAndUpdate(user._id, { ...updateData });
    }
    else if (role === "parents") {
        user = await Parents.findById(_id);
        if (!user) return res.status(400).json({ success: false, message: "parents not found" })
        updateUser = await Parents.findByIdAndUpdate(user._id, { ...updateData });
    }
    else return res.status(400).json({ success: false, message: "Invalid role of user" })

    if (updateUser) return res.status(200).json({ success: true, message: `${updateUser.fullname} account is updated successfully` })
    
    res.status(200).json({ success: false, message: `Account is not updated` })
})
module.exports = {
    getAllStudents,
    getAllTeachers,
    getAllParents,
    deleteStudent,
    deleteTeacher,
    deleteParents,
    updateUser
}