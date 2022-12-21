const multer = require("multer");
const path = require("path");

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../client/public/images"),
    filename: function (req, file, cb) {
        const fileName =
            "profilePic-" +
            req?.user?._id?.toString() +
            path.extname(file.originalname);

        cb(null, fileName);
    },
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Images with jpeg, jpg and png extension allowed ");
    }
}

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("profilePic");

module.exports = { upload };
