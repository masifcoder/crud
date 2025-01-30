const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3003;
const bcrypt = require("bcrypt");
const path = require("path");
require('dotenv').config();

const categoryRouter = require("./routes/CategoryRouter");
const userRouter = require("./routes/UserRouter");
const { Login } = require('./controllers/UserController');
const postRouter = require('./routes/PostRouter');


//middleware
app.use(express.json());
app.use(express.static('uploads'));


// import multer
const multer = require("multer");
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //cb(null, false);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});



app.post("/upload", upload.single("image"), async (req, res) => {
    try {

        console.log(req.file);


        res.json({
            status: "Done"
        });

    } catch (error) {
        return res.status(404).json({
            status: "Fail",
            message: "file type in invalid"
        })
    }
})


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


// database connection
mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
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