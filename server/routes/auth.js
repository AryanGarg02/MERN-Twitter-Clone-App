const express = require("express");
const User = require("../schema/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

// user login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error("Please provide all required fields");
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("username does not exist");
        }

        if (user.password !== password) {
            throw new Error("incorrect password");
        }

        // hide user password
        user.password = undefined;

        const jwtSecret = jwt.sign(
            { _id: user._id, username: user.username, name: user.name },
            JWT_SECRET
        );

        res.status(200).json({
            user,
            jwtToken: jwtSecret,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

// user sign up
router.post("/register", async (req, res) => {
    try {
        const { name, username, password, email } = req.body;
        if (!name || !username || !password || !email) {
            throw new Error("Please provide all required fields");
        }

        const userData = {
            name,
            username,
            password,
            email,
        };

        const existingUser = await User.findOne({
            $or: [{ password: userData.password }, { email: userData.email }],
        });

        if (existingUser?.email === userData.email) {
            throw new Error("email already exist");
        }

        if (existingUser?.username === userData.username) {
            throw new Error("username already exist");
        }

        await new User(userData).save();

        res.status(200).json("User created successfully");
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

module.exports = { authRoutes: router };
