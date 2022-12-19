const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
    eventTitle: { type: String, required: true },
    eventDescription: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    eventFor: { type: String, required: true },
    stream: { type: String, default: "all" },
    grade: { type: String, default: "all" },
}, { timestamps: true });

const Events = new mongoose.model("Events",EventsSchema);

module.exports = Events;