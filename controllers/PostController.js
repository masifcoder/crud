
const PostModel = require("../models/Post");


const createPost = async (req, res) => {
    try {
        const data = req.body;
        data.authorId =  req.userId;

        const post = await PostModel.create(data);
        
        return res.status(201).json({
            status: "Ok",
            message: "Successfully created",
            post: post
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
}



module.exports = {createPost}