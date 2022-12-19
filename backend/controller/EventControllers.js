const asyncHandler = require("express-async-handler");
const Events = require("../model/Event");
const Teacher = require("../model/Teacher");


const eventDetails = [
    "eventTitle",
    "eventDescription",
    "startDate",
    "endDate",
    "eventFor",
]

// -------------------------createEvent--------------------------
const createEvent = asyncHandler(async (req, res) => {
    const admin = await Teacher.findById(req.user._id);
    console.log(req.body)
    if (!admin && admin?.role !== "Admin") return res.status(401).json({ success: false, message: "UnAuthorized" })

    eventDetails.forEach(item => {
        console.log(item)
        if (!req.body[item]) {
            return res.status(400).json({ success: false, message: `require ${item}` })
        }
    })

    const { stream, grade, ...requiredDetails } = req.body;

    // create new user in mongodb database
    const newEvent = await Events.create({
        ...requiredDetails,
        stream: stream ? stream : "all",
        grade: grade ? grade : "all",
    })


    // check events is created or not
    if (newEvent) {
        return res.status(201).json({ success: true, newEvent })
    }
    return res.status(400).json({ success: false, message: "Cannot create user. !Invalid Event data." })
})


module.exports = {
    createEvent
}