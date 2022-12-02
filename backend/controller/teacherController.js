const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");


// generateToken function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRECT, { expiresIn: "1d" });
}

// teacher details required
const teacherDetails = [
    "id",
    "fullname",
    "gender",
    "email",
    "password",
    "address",
    "subject",
    "dob",
    "mobile",
]


// ********************registerTeacher function****************************
const registerTeacher = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher || teacher.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })
    const { email, password, mobile } = req.body;
    teacherDetails.forEach(detail => {
        if (!req.body[detail]) {
            console.log(`${detail} is not filled...`)
            console.log(detail)
            return res.status(400).json({ success: false, message: "Please fill the form properly." })
        }
    })
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." })
    if (password.length > 23) return res.status(400).json({ message: "Password must not be more than 23 characters." });

    // check if user exist already
    const idExists = await Teacher.findOne({ id }) || await Student.findOne({ id });
    const emailExists = await Teacher.findOne({ email }) || await Student.findOne({ email });
    const mobileExists = await Teacher.findOne({ mobile }) || await Student.findOne({ mobile });
    if (idExists || emailExists || mobileExists) return res.status(400).json({ success: false, message: `please add unique id, email, & mobile` })


    // create new user in mongodb database
    const newTeacher = await Teacher.create(req.body)

    // check teacher is created or not
    if (newTeacher) {
        res.status(201).json({ success: true, newTeacher })
    }
    else {
        res.status(400).json({ success: false, message: "Cannot create user. !Invalid user data." })
    }
})


// *******************loginTeacher function********************************
const loginTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) return res.status(400).json({ message: "Email & Password required." })

    // check user existence
    const teacher = await Teacher.findOne({ email }).lean().exec();
    if (!teacher) return res.status(400).json({ error: "Invalid user credentials." });

    // check password
    const isCorrectPassword = await bcrypt.compare(password, teacher.password)

    // provide credentials to user if email and password match
    if (teacher && isCorrectPassword) {
        const { _id } = teacher

        // generate token
        const token = generateToken(_id)
        // sending httpOnly cookie to the browser
        res.cookie('token', token, {
            httpOnly: true, //accessible only by web server 
            expires: new Date(Date.now() + 25892000000),
        })
        return res.status(200).json({ teacher, token })
    }
    else {
        res.status(400).json({ message: "Cannot login user. !Invalid user email or password." })
    }

})

// // *******************getTeacherr*****************
const getTeacher = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    let teacher = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin" && !teacher) return res.status(401).json({ success: false, message: "UnAuthorized" })

    // logic
    if (admin?.role === "Admin" && req.params.teacherId) {
        const { teacherId } = req.params;
        teacher = await Teacher.findById(teacherId); 
    }
    if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found..." })
    const { id, fullname, gender, email, photo, profile, bio, address, subject, dob, mobile } = teacher
    res.status(200).json({
        id,
        fullname,
        gender,
        email,
        photo,
        profile,
        bio,
        address,
        subject,
        dob,
        mobile,
    })

})

//**************************update teacher****************************
const updateTeacher = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    let teacher = await Teacher.findById(req.user._id);
    if (!admin && admin?.role !== "Admin" && !teacher) return res.status(401).json({ success: false, message: "UnAuthorized" })

    // logic here
    if (admin.role === "Admin" && req.params.teacherId) {
        const { teacherId } = req.params;
        teacher = await Teacher.findById(teacherId);
    }

    if (!teacher) return res.status(404).json({ success: false, message: "teacher not found..." })
    const { fullname, email, photo, profile, bio, address, mobile } = teacher
    teacher.email = email;
    teacher.fullname = req.body.fullname || fullname;
    teacher.photo = req.body.photo || photo;
    teacher.profile = req.body.profile || profile;
    teacher.address = req.body.address || address;
    teacher.mobile = req.body.mobile || mobile;
    teacher.bio = req.body.bio || bio;

    const updatedUser = await teacher.save();
    res.status(201).json({
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        photo: updatedUser.photo,
        bio: updatedUser.bio,
        profile: updatedUser.profile,
        mobile: updatedUser.mobile,
        address: updatedUser.address
    })
})



module.exports = {
    registerTeacher,
    loginTeacher,
    getTeacher,
    updateTeacher
}