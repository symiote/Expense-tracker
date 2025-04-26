const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("mongo db connected");
    } catch (error) {
        console.log("Error in connecting to MongoDB ",error);
        process.exit(1);
    }
}


module.exports = connectDB; 
