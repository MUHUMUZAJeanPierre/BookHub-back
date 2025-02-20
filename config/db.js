const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected")
    } catch (error) {
        console.error("❌ MongoDB Connection Failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;