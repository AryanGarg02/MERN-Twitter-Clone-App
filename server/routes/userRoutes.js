const express = require("express");
const User = require("../schema/userSchema");
const router = express.Router();
const { upload } = require("../multer-upload/multer-upload");
const path = require("path");

// follow user
router.post("/:id/follow/", async (req, res) => {
    try {
        const userToFollowId = req.params.id;
        const authUserId = req.user._id.toString();

        // check if user self follow
        if (userToFollowId === authUserId) {
            throw new Error("You cannot follow your own profile");
        }

        // check if the user is already following
        if (req.user.following && req.user.following.includes(userToFollowId)) {
            throw new Error("You already follow that profile");
        }

        await User.findByIdAndUpdate(authUserId, {
            $addToSet: { following: userToFollowId },
        });
        await User.findByIdAndUpdate(userToFollowId, {
            $addToSet: { followers: authUserId },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

// un follow user
router.post("/:id/unfollow/", async (req, res) => {
    try {
        const userToUnFollowId = req.params.id;
        const authUserId = req.user._id.toString();

        if (userToUnFollowId === authUserId) {
            throw new Error("You cannot un-follow your own profile");
        }

        // check if the user does not follow
        if (
            !(
                req.user.following &&
                req.user.following.includes(userToUnFollowId)
            )
        ) {
            throw new Error("You do not follow that profile");
        }

        await User.findByIdAndUpdate(authUserId, {
            $pull: { following: userToUnFollowId },
        });
        await User.findByIdAndUpdate(userToUnFollowId, {
            $pull: { followers: authUserId },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

// edit user
router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const { name, dateOfBirth, location } = req.body;
        if (!name || !dateOfBirth || !location) {
            throw new Error("Please provide all required fields");
        }

        const updatedUser = {
            name,
            dateOfBirth,
            location,
        };

        await User.findOneAndUpdate({ _id: userId }, updatedUser);

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

// get user details
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId })
            .populate("following", "-password")
            .populate("followers", "-password")
            .populate("likedTweets")
            .select("-password");

        if (!user) {
            throw new Error("user does not exist");
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

// upload user profile picture
router.post("/:id/uploadProfilePic", async (req, res) => {
    try {
        const userId = req.params.id;

        if (userId !== req?.user?._id?.toString()) {
            throw new Error("Owner can only change the profile pic");
        }

        upload(req, res, async (err) => {
            try {
                if (err) {
                    throw new Error(
                        err || "Error occurred while uploading profile pic"
                    );
                } else {
                    if (req.file == undefined) {
                        throw new Error(" No File Selected");
                    } else {
                        const fileName =
                            "profilePic-" +
                            req?.user?._id?.toString() +
                            path.extname(req.file.originalname);

                        await User.findOneAndUpdate(
                            { _id: userId },
                            { profilePic: fileName }
                        );
                        res.status(200).json("Image uploaded");
                    }
                }
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: error.message || "Unknown error occurred",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Unknown error occurred",
        });
    }
});

module.exports = { userRoutes: router };
