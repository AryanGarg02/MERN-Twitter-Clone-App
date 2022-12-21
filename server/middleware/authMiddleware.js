const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const User = require("../schema/userSchema");

const verifyAuthToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(401)
            .json({ error: true, message: "User not logged in" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            return res
                .status(401)
                .json({ error: true, message: "Invalid access token" });
        }
        const userId = payload._id;
        User.findOne({ _id: userId })
            .then((user) => {
                req.user = user;
                next();
            })
            .catch((error) => {
                return res
                    .status(401)
                    .json({ error: true, message: "Invalid access token" });
            });
    });
};

module.exports = { verifyAuthToken };
