const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");


// generateToken function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRECT, { expiresIn: "1d" });
}

// student details required
const studentDetails = [
    "id",
    "fullname",
    "gender",
    "email",
    "password",
    "address",
    "grade",
    "stream",
    "dob",
    "mobile",
]


// ********************registerStudent function****************************
const registerStudent = asyncHandler(async (req, res) => {
    console.log(req.body)
    const teacher = await Teacher.findById(req.user._id);
    if(!teacher || teacher.role !== "Admin") return res.status(401).json({success: false, message: "UnAuthorized"})
    const { id, roll, email, password, mobile } = req.body;
    studentDetails.forEach(detail => {
        if (!req.body[detail]) {
            console.log(`${detail} is not filled...`)
            return res.status(400).json({ success: false, message: "Please fill the form properly." })
        }
    })
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." })
    if (password.length > 23) return res.status(400).json({ message: "Password must not be more than 23 characters." });

    // check if user exist already
    const rollExists = await Student.findOne({ roll });
    const idExists = await Teacher.findOne({ id }) || await Student.findOne({ id });
    const emailExists = await Teacher.findOne({ email }) || await Student.findOne({ email });
    const mobileExists = await Teacher.findOne({ mobile }) || await Student.findOne({ mobile });
    if (idExists || rollExists || emailExists || mobileExists) return res.status(400).json({ success: false, message: `please add unique roll, email, & mobile` })


    // create new user in mongodb database
    const newStudent = await Student.create(req.body)

    // check student is created or not
    if (newStudent) {
        res.status(201).json({ success: true, newStudent })
    }
    else {
        res.status(400).json({ success: false, message: "Cannot create user. !Invalid user data." })
    }

})


// *******************loginUser function********************************
const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // validation
    if (!email || !password) return res.status(400).json({ message: "Email & Password required." })

    // check user existence
    const student = await Student.findOne({ email }).lean().exec();
    if (!student) return res.status(400).json({ error: "Invalid user credentials." });

    // check password
    const isCorrectPassword = await bcrypt.compare(password, student.password)

    // provide credentials to user if email and password match
    if (student && isCorrectPassword) {
        const { _id } = student

        // generate token
        const token = generateToken(_id)
        // sending httpOnly cookie to the browser
        res.cookie('token', token, {
            httpOnly: true, //accessible only by web server 
            expires: new Date(Date.now() + 25892000000),
        })
        return res.status(200).json({ student, token })
    }
    else {
        res.status(400).json({ message: "Cannot login user. !Invalid user email or password." })
    }

})

// *******************getStudent*****************
const getStudent = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    let student = await Student.findById(req.user._id);
    if(!admin && admin?.role !== "Admin" && !student) return res.status(401).json({success: false, message: "UnAuthorized"})
    if (admin?.role === "Admin") {
        const {studentId} = req.params;
        student = await Student.findById(studentId);
    }
    if(!student) return res.status(404).json({success: false, message: "Student not found..."})
        const { id, fullname, gender, roll, email, photo, profile, bio, address, grade, stream, section, dob, mobile } = student
        res.status(200).json({
            id,
            fullname,
            gender,
            email,
            photo,
            roll,
            profile,
            bio,
            address,
            grade,
            stream,
            section,
            dob,
            mobile,
        })

})

//**************************update student****************************
const updateStudent = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    let student = await Student.findById(req.user._id);
    if(!admin && admin?.role !== "Admin" && !student) return res.status(401).json({success: false, message: "UnAuthorized"})

    // logic here
    if(admin?.role === "Admin"){
        const {studentId} = req.params;
        student = await Student.findById(studentId);
    }
    
    if(!student) return res.status(404).json({success: false, message: "Student not found..."})
    const { fullname, email, photo, profile, bio, address, mobile } = student
    student.email = email;
    student.fullname = req.body.fullname || fullname;
    student.photo = req.body.photo || photo;
    student.profile = req.body.profile || profile;
    student.address = req.body.address || address;
    student.mobile = req.body.mobile || mobile;
    student.bio = req.body.bio || bio;

    const updatedUser = await student.save();
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
    registerStudent,
    loginStudent,
    getStudent,
    updateStudent,
}