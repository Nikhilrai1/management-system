const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");
const Parents = require("../model/Parents");


// generateToken function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRECT, { expiresIn: "1d" });
}

// student details required
const parentsDetails = [
    "id",
    "fullname",
    "gender",
    "email",
    "password",
    "address",
    "parentsOf",
    "dob",
    "mobile",
]


// ********************registerParents function****************************
const registerParents = asyncHandler(async (req, res) => {
    console.log(req.body)
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher || teacher.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })
    const { id, password, email, mobile, parentsOf } = req.body;
    parentsDetails.forEach(detail => {
        if (!req.body[detail]) {
            console.log(`${detail} is not filled...`)
            return res.status(400).json({ success: false, message: "Please fill the form properly." })
        }
    })
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." })
    if (password.length > 23) return res.status(400).json({ message: "Password must not be more than 23 characters." });

    // check if user exist already
    const idExists = await Teacher.findOne({ id }) || await Student.findOne({ id }) || await Parents.findOne({ id });
    const emailExists = await Teacher.findOne({ email }) || await Student.findOne({ email }) || await Parents.findOne({ email });
    const mobileExists = await Teacher.findOne({ mobile }) || await Student.findOne({ mobile }) || await Parents.findOne({ mobile });
    parentsOf.forEach(async (kid) => {
        const student = await Student.findOne({ id: kid.id });
        if(!student) return res.status(400).json({ success: false, message: `child  having id: ${id} is not found` })
    })

    // const parents = await Parents.find();
    // parents.forEach(parent => {
    //     parentsOf.forEach(student => {
    //         if(parent.parentsOf.includes(student)){
    //             return res.status(400).json({ success: false, message: `child  having id: ${student.id} is not your` })
    //         }
    //     })
    // })

    if (idExists || emailExists || mobileExists) return res.status(400).json({ success: false, message: `please add unique id, email, & mobile` })


    // create new user in mongodb database
    const newParents = await Parents.create(req.body)

    // check Parents is created or not
    if (newParents) {
        res.status(201).json({ success: true, newParents })
    }
    else {
        res.status(400).json({ success: false, message: "Cannot create user. !Invalid user data." })
    }

})

// *******************loginParents function********************************
const loginParents = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) return res.status(400).json({ message: "Email & Password required." })

    // check user existence
    const parents = await Parents.findOne({ email }).lean().exec();
    if (!parents) return res.status(400).json({ error: "Invalid user credentials." });

    // check password
    const isCorrectPassword = await bcrypt.compare(password, parents.password)

    // provide credentials to user if email and password match
    if (parents && isCorrectPassword) {
        const { _id } = parents

        // generate token
        const token = generateToken(_id)
        // sending httpOnly cookie to the browser
        res.cookie('token', token, {
            httpOnly: true, //accessible only by web server 
            expires: new Date(Date.now() + 25892000000),
        })
        return res.status(200).json({ parents, token })
    }
    else {
        res.status(400).json({ message: "Cannot login user. !Invalid user email or password." })
    }

})



module.exports = {
    registerParents,
    loginParents
}