const express = require("express");
const { registerStudent, loginStudent, getStudent, updateStudent } = require("../controller/studentControllers");
const { protect, protectLogin } = require("../middleware/authMiddleware");
const router = express.Router();

// userRoutes
router.post("/register",protect, registerStudent)
router.post("/login", protectLogin ,loginStudent)
router.get("/getStudent" ,protect ,getStudent)
router.get("/getStudent/:studentId" ,protect ,getStudent)
router.patch("/updateStudent" ,protect,updateStudent)
router.patch("/updateStudent/:studentId" ,protect ,updateStudent)
router.patch("/updateStudent" ,protect,updateStudent)









module.exports = router;