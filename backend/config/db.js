const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connection to mongoDb successfully...")
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = connectDB;