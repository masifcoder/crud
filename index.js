const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3003;
const bcrypt = require("bcrypt");
const path = require("path");
require('dotenv').config();
const multer = require("multer");
const cors = require("cors");


// handle cross origin resource sharing
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

const categoryRouter = require("./routes/CategoryRouter");
const userRouter = require("./routes/UserRouter");
const postRouter = require('./routes/PostRouter');
const upload = require('./helpers/ImageUpload');


//middleware
app.use(express.json());

// serve static files like images/uploads folder
app.use(express.static('uploads'));



app.get('/', async (req, res) => {
    // const hashed = await bcrypt.hashSync("password", 10);

    const hashed = bcrypt.compareSync("password", "$2b$10$/RNnucGkC8kLCSjdbjZcNe9E81T4kydL.8EcXkVbwn0/IL3I8Cctu");

    res.json({
        hashed: hashed
    });

});




// category
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);





// Error handling middleware for Multer errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer errors (e.g., file size limit exceeded)
        return res.status(400).json({
            success: false,
            message: err.message || "File upload error.",
        });
    } else if (err) {
        // Handle other errors (e.g., invalid file type)
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
});




// database connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(port, () => {
        console.log(`Database & server is running...`)
    });

}).catch((er) => {
    console.log(er.message)
})




// find the process
// netstat -ano | findstr :3003


// kill process
//taskkill /PID 12060 /F