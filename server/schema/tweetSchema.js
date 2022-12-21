const mongoose = require("mongoose");
const tweetSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        tweetedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                content: { type: String },
                commentedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                commentedAt: { type: Date },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
