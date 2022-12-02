const express = require("express");
const { getAllTeachers, getAllStudents, deleteTeacher, deleteStudent, getAllParents, deleteParents } = require("../controller/adminControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// adminRoutes
router.get("/getAllStudents" ,protect ,getAllStudents)
router.get("/getAllTeachers", protect ,getAllTeachers)
router.get("/getAllParents", protect ,getAllParents)
router.delete("/deleteStudent/:studentId", protect ,deleteStudent)
router.delete("/deleteTeacher/:teacherId", protect ,deleteTeacher)
router.delete("/deleteParents/:parentsId", protect ,deleteParents)



module.exports = router;