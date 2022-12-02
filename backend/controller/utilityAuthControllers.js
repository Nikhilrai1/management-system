const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");
const { StudentToken, TeacherToken } = require("../model/Token");
const sendEmail = require("../utils/sendEmail");


// *******************logout*****************
const logout = asyncHandler(async (req, res) => {
    if (!req.cookies.token) return res.status(404).json({ success: false, message: "can't logout it may be you have already logout..." })
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: "none",
        path: "/",
    })
    return res.status(200).json({ message: "Logout Successfully..." });
})

//**************************login status****************************
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRECT);
    if (!verified) return res.json(false)
    res.json(true);
})

//**************************change password****************************
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: "Please fill the oldPassword & newPassword" });
    const user = await Student.findById(req.user._id) || await Teacher.findById(req.user._id);

    // check user existence
    if (!user) return res.status(400).json({ message: "User Not Found!!!" });

    // check oldpassword match or not
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (!isPasswordMatch) return res.status(400).json({ message: "Old Password Do Not Matched!!!" });
    if (isSamePassword) return res.status(400).json({ message: "oldpassword & newpassword should not be same!!!" });

    // if old password match & user exist
    user.password = newPassword;
    const updateUser = await user.save();

    if (updateUser) {
        res.status(200).json({ message: "Password changed successfully..." })
    }
    else {
        res.status(400).json({ message: "User not found!" })
    }
})

// ****************************forget password*****************************
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Please add email" })
    const user = await Student.findOne({ email }) || await Teacher.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User Not Found!!!" });


    // create reset token
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    // hash token before saving in db.
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    let oldToken;
    // delete token if exist before creating new token & save token to db 
    if (user.role === "Student") {

        oldToken = await StudentToken.findOne({ userId: user._id });
        console.log(oldToken)
        if (oldToken) {
            await StudentToken.deleteOne({ oldToken })
        }

        await new StudentToken({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + (30 * 60 * 1000) // expires after 30 minutes
        }).save()
    }
    else if (user.role === "Teacher") {

        oldToken = await TeacherToken.findOne({ userId: user._id });
        console.log(oldToken)
        if (oldToken) {
            await TeacherToken.deleteOne({ oldToken })
        }
        await new TeacherToken({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + (30 * 60 * 1000) // expires after 30 minutes
        }).save()
    }

    // construct reset url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // construct email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the below url to reset your password</p>
        <p>This reset link is only valid for 30 minutes</p>
        <a href=${resetUrl}>${resetUrl}</a>
        <p>Reagards...</p>
        <p>${process.env.TEAM_NAME}</p>
    `

    // subject | sendTo | sendFrom
    const subject = "Password reset request";
    const send_to = user.email;
    const send_from = process.env.EMAIL_USER

    try {
        await sendEmail(subject, message, send_to, send_from, send_from);
        res.status(200).json({ success: true, message: "Reset Email Successfully Sent...", resetToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error!!!" })
    }
})

// ****************************reset password*****************************
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params

    // hash token to compare with token in db
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // find token in db
    const userToken = await StudentToken.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() } // make sure to check token is not expire
    }) || await TeacherToken.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() } // make sure to check token is not expire
    });

    // condition if token is expired or invalid
    if (!userToken) return res.status(400).json({ message: "Invalid or expired token!!!" })

    const user = await Student.findById({ _id: userToken.userId }) || await Teacher.findById({ _id: userToken.userId });
    if (!user) return res.status(400).json({ message: "User Not Found!!!" })
    user.password = password;
    await user.save();

    if (user.role === "Student") {
        await StudentToken.deleteOne({ userToken })
    }
    else if (user.role === "Teacher") {
        await TeacherToken.deleteOne({ userToken })
    }
    res.status(200).json({
        success: true,
        message: "Password reset successful. Please Login..."
    })

})

module.exports = {
    logout,
    loginStatus,
    changePassword,
    forgetPassword,
    resetPassword
}