const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();



// userRoutes
router.post("/login", protectLogin, loginParents)

module.exports = router;