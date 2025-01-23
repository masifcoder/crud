const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const PostModel = require("./models/Post");
const Category = require("./models/Category");


//middleware
app.use(express.json());

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



// category api
app.post("/category/create", async (req, res) => {

    try {

        const data = req.body;
        const newCat = await Category.create(data);

        return res.status(201).json({
            status: "Ok",
            message: "Successfully created",
            category: newCat
        });

    } catch (error) {
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

// get all categories
app.get("/categories", async (req, res) => {
    
    try {

        const categories = await Category.find();

        return res.json({
            status: "Ok",
            categories: categories
        });

    } catch (error) {

        console.log(error);
        return res.status(400).json({
            status: "Fail",
            errors: error.message
        });

    }
});

// get single category
app.get("/category/get/:id", async (req, res) => {
    try {
        
        const id = req.params.id;
        const category = await Category.findById(id);
        
        return res.json({
            status: "Ok",
            category: category
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "Fail",
            errors: error.message
        });
    }
})

// delete a category
app.delete("/category/delete/:id", async (req, res) => {
    try {
        
        const id = req.params.id;
        await Category.findByIdAndDelete(id);

        return res.json({
            status: "Ok",
            message: "Successfully deleted"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "Fail",
            errors: error.message
        });
    }
});

// update a category
app.put("/category/update/:id", async (req, res) => {
    try {
        
        const id = req.params.id;
        const data = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true, runValidators: true});

        return res.json({
            status: "Ok",
            message: "Successfully updatedddd",
            category: updatedCategory
        });

    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {

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

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
    app.listen(port, () => {
        console.log(`Database & server is running...`)
    })

}).catch((er) => {
    console.log(er.message)
})

