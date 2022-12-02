const express = require("express");
const { loginParents, registerParents } = require("../controller/parentsController");
const { protect, protectLogin } = require("../middleware/authMiddleware");
const router = express.Router();



// userRoutes
router.post("/register",protect, registerParents)
router.post("/login", protectLogin, loginParents)

module.exports = router;