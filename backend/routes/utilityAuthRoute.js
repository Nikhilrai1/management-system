const express = require("express");
const { loginStatus, changePassword, logout, forgetPassword, resetPassword } = require("../controller/utilityAuthControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/loginStatus", loginStatus)
router.patch("/changePassword", protect, changePassword)
router.get("/logout", logout)
router.post("/forgetPassword", forgetPassword)
router.put("/resetpassword/:resetToken", resetPassword)

module.exports = router;