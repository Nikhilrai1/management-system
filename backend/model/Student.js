const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const StudentSchema = new mongoose.Schema({
    id: { type: String, required: [true, "Required id"], unique: [true, "Need Unique id"]  },
    fullname: { type: String, required: [true, "Required name"] },
    gender: { type: String, required: [true, "Required gender"] },
    profile: { type: String, default:""},
    roll: {type: String, required: [true, "Required name"], unique: [true, "Need Unique roll number"]},
    photo: {
        type: String,
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    bio: {
        type: String,
        default: "Bio",
        maxLength: [250, "Bio must not be more than  250 character."],
    },
    email: {
        type: String,
        require: [true, "Please add your email."],
        unique: [true, "Need Unique email"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid Email"
        ]
    },
    password: { type: String, required: [true, "Required Password"]},
    address: { type: String, required: [true, "Required Address"] },
    grade: { type: String, required: [true, "Required Grade"] },
    stream: { type: String, required: [true, "Required Stream"] },
    section: { type: String, default: "" },
    dob: { type: String, required: [true, "Required DOB"]},
    mobile: { type: String, minLength: 10, maxLength: 10, required: [true, "Required Mobile Number"], unique: [true, "Need Unique Mobile"] },
    role: {type: String, default: "Student"}
}, { timestamps: true });
StudentSchema.pre("save", async function (next) {
    // check password is modified or not if not modified then return
    if(!this.isModified("password")){
        return next();
    }

    // encrypt password
    const salt = 10
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student

