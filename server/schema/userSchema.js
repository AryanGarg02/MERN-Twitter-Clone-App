const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
        },
        location: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        likedTweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
