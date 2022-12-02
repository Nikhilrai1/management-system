const express = require("express");
const { registerTeacher, loginTeacher, getTeacher, updateTeacher } = require("../controller/teacherController");
const { protect, protectLogin } = require("../middleware/authMiddleware");
const router = express.Router();



// userRoutes
router.post("/register",protect, registerTeacher)
router.post("/login", protectLogin, loginTeacher)
router.get("/getTeacher/:teacherId" ,protect ,getTeacher)
router.get("/getTeacher" ,protect ,getTeacher)
router.patch("/updateTeacher", protect, updateTeacher)
router.patch("/updateTeacher/:teacherId", protect, updateTeacher)



module.exports = router;