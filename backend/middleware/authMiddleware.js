const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");



const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "UnAuthorized! required authorized user please login again." })
        // verified token
        const verified = jwt.verify(token, process.env.JWT_SECRECT);
        const user = await Student.findById(verified.id).select("-password") || await Teacher.findById(verified.id).select("-password")
        if (!user) return res.status(401).json({ message: "User Not Found!!!" });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "UnAuthorized please login again!!!" });
    }
})

const protectLogin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) return res.status(401).json("UnAutherized logout first...");
    next()
})


module.exports = { protect, protectLogin };