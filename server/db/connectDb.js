const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/twitter-clone-capstone-project";

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected!");
    } catch (error) {
        console.log("Error connecting to mongodb", error);
    }
};

module.exports = { connectDb };
