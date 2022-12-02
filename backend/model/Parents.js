const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const ParentsSchema = new mongoose.Schema({
    id: { type: String, required: [true, "Required id"], unique: [true, "Need Unique id"]  },
    fullname: { type: String, required: [true, "required name"] },
    gender: { type: String, required: [true, "required gender"] },
    profile: { type: String, default: "" },
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
    password: { type: String, required: [true, "required password"] },
    address: { type: String, required: [true, "required address"] },
    parentsOf: { type: Array, required: [true, "required subject"] },
    dob: { type: String, required: [true, "required dob"] },
    mobile: { type: String, minLength: 10, maxLength: 10, required: [true, "required mobile"], unique: [true, "Please add another mobile number"] },
    role: {type: String, default: "Parents"}
}, { timestamps: true });
 ParentsSchema.pre("save", async function (next) {
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
const Parents = mongoose.model('Parents', ParentsSchema);
module.exports = Parents;