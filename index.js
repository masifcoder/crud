const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3005;
const PostModel = require("./models/Post");
const bcrypt = require("bcrypt");

const categoryRouter = require("./routes/CategoryRouter");  
const userRouter = require("./routes/UserRouter");  


//middleware
app.use(express.json());

// custom middlware on application level
// app.use((req, res, next) => {

//     console.log(`${req.method} ${req.url}`);
//     console.log(req.query.q);
//     if(req.query.q == "123") {

//         req.qid = req.query.q;

//         next();
//     } else {
//         res.status(400).json({
//             message: "Id is not correct, You are not alloewd to go"
//         })
//     }

// });


// Route level middleware
const checkMiddleware = (req, res, next) => {

    console.log(`${req.method} ${req.url}`);
    console.log(req.query.q);
    if (req.query.q == "123") {

        req.qid = req.query.q;

        next();
    } else {
        res.status(400).json({
            message: "Id is not correct, You are not alloewd to go"
        })
    }

};




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



// database connection
mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
    app.listen(port, () => {
        console.log(`Database & server is running...`)
    })

}).catch((er) => {
    console.log(er.message)
})



// find the process
// netstat -ano | findstr :3003


// kill process
//taskkill /PID 12060 /F