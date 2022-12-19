const express = require("express");
const { createEvent } = require("../controller/EventControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();



// userRoutes
router.post("/createEvent", protect, createEvent)

module.exports = router;