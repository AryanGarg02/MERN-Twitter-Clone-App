const express = require("express");
const Tweet = require("../schema/tweetSchema");
const User = require("../schema/userSchema");
const router = express.Router();

// create new tweet
router.post("/", async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            throw new Error("Tweet content cannot be empty");
        }

        const tweetBody = {
            content,
            tweetedBy: req.user._id,
        };

        const savedTweet = await new Tweet(tweetBody).save();

        res.status(200).json(savedTweet);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

// like a tweet
router.post("/:id/like", async (req, res) => {
    try {
        const tweetId = req.params.id;

        if (req.user.likedTweets.includes(tweetId)) {
            throw new Error("You already liked this tweet");
        }

        const tweetUpdated = await Tweet.findOneAndUpdate(
            { _id: tweetId },
            { $addToSet: { likes: req.user._id } },
            { new: true }
        );

        if (!tweetUpdated) {
            throw new Error("Tweet does not exist");
        }

        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $addToSet: { likedTweets: tweetId } }
        );

        res.status(200).send("Tweet Liked");
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

// unlike a tweet
router.post("/:id/unlike", async (req, res) => {
    try {
        const tweetId = req.params.id;

        if (!req.user.likedTweets.includes(tweetId)) {
            throw new Error("You have not liked this tweet before");
        }

        const tweetUpdated = await Tweet.findOneAndUpdate(
            { _id: tweetId },
            { $pull: { likes: req.user._id } },
            { new: true }
        );

        if (!tweetUpdated) {
            throw new Error("Tweet does not exist");
        }

        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { likedTweets: tweetId } }
        );

        res.status(200).send("Tweet un-liked");
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

// add a comment to a tweet
router.post("/:id/comment", async (req, res) => {
    try {
        const tweetId = req.params.id;
        const content = req.body.content;

        if (!content) {
            throw new Error("Comment content is required");
        }

        const commentBody = {
            content,
            commentedBy: req.user._id,
            commentedAt: new Date(),
        };

        const tweetUpdated = await Tweet.findOneAndUpdate(
            { _id: tweetId },
            { $addToSet: { comments: commentBody } },
            { new: true }
        );

        if (!tweetUpdated) {
            throw new Error("Tweet does not exist");
        }

        res.status(200).json("Comment added");
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

// get tweet details
router.get("/:id", async (req, res) => {
    try {
        const tweetId = req.params.id;
        const tweet = await Tweet.findOne({ _id: tweetId })
            .populate("tweetedBy", "-password")
            .populate("likes", "-password")
            .populate("comments.commentedBy", "-password");

        if (!tweet) {
            throw new Error("Tweet does not exist");
        }

        res.status(200).json(tweet);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

// delete a tweet
router.delete("/:id", async (req, res) => {
    try {
        const tweetId = req.params.id;

        const tweet = await Tweet.findOne({ _id: tweetId });
        if (!tweet.tweetedBy.toString() === req.user._id) {
            throw new Error(
                "Only tweet owners are allowed to delete their tweets"
            );
        }

        const deletedTweet = await Tweet.findOneAndDelete({ _id: tweetId });

        if (!deletedTweet) {
            throw new Error("Tweet does not exist");
        }

        res.status(200).json("Tweet deleted");
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

// get tweet details
router.get("/", async (req, res) => {
    try {
        const tweets = await Tweet.find()
            .sort({ createdAt: -1 })
            .populate("tweetedBy", "-password")
            .populate("likes", "-password")
            .populate("comments.commentedBy", "-password");

        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || "Error occurred",
        });
    }
});

module.exports = { tweetRoutes: router };
