// import multer
const multer = require("multer");
const path = require("path");

// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Configure Multer with limits and file filter
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024, // 5 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = [".jpg", ".jpeg", ".png"]; // Allowed file extensions
        const extname = path.extname(file.originalname).toLowerCase();
        if (allowedFileTypes.includes(extname)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error("Invalid file type. Only JPG, JPEG, PNG are allowed."), false); // Reject the file
        }
    }
});


module.exports = upload;