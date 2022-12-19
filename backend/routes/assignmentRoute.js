const express = require("express");
const { createAssignment, getAllAssignment } = require("../controller/assignmentControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();



// userRoutes
router.post("/upload", protect, createAssignment)
router.get("/getAllAssignment", protect, getAllAssignment)

module.exports = router;