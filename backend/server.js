const express = require("express")
const app = express()
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
require("dotenv").config() // configuring for env file
connectDB() // connecting mongoDB


// middleware
app.use(cors(corsOptions))
app.use(express.json()) // use json file
app.use(express.urlencoded({ extended: false })) // for form data
app.use(cookieParser());





// routes

// auth
app.use("/api/auth/student", require("./routes/studentRoute"))
app.use("/api/auth/teacher", require("./routes/teacherRoute"))
app.use("/api/auth/parents", require("./routes/parentsRoute"))
app.use("/api/auth/admin", require("./routes/adminRoute"))
app.use("/api/auth", require("./routes/utilityAuthRoute"))

// assignment
app.use("/api/assignment", require("./routes/assignmentRoute"))
app.use("/api/event", require("./routes/EventRoute"))



// error handler
app.use(errorHandler)

// starting server by listening port
const PORT = process.env.PORT || 3500;
app.listen(PORT, (err) => {
    if (err) throw new Error(err.message)
    console.log(`Server Started at http://localhost:${PORT}`)
})
