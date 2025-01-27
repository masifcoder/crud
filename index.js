const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const PostModel = require("./models/Post");


const categoryRouter = require("./routes/CategoryRouter");    

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




app.get('/', (req, res) => {
    res.send('Hello World!');

});


app.post("/create", async (req, res) => {
    try {

        const data = req.body;
        // console.log(data);

        // create a post
        const newPost = await PostModel.create(data);


        res.status(200).send({
            status: "Ok",
            message: "successfully created",
            newPost: newPost
        });

    } catch (err) {
        if (err.name === "ValidationError") {

            const errors = Object.entries(err.errors).map(([field, error]) => ({
                field,
                message: error.message,
            }));

            return res.status(400).json({
                status: "Fail",
                errors: errors
            });

        } else {
            console.error("Unexpected error:", err);
        }

    }
});

app.get("/posts", async (req, res) => {

    try {
        const posts = await PostModel.findById("67907f01b2eed548573e67d2");

        return res.status(200).json({
            status: "Ok",
            posts: posts
        });

    } catch (error) {

    }
});


// category
app.use("/category", categoryRouter);



// database connection
mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
    app.listen(port, () => {
        console.log(`Database & server is running...`)
    })

}).catch((er) => {
    console.log(er.message)
})

