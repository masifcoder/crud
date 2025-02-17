
const mongoose = require("mongoose");
const PostModel = require("../models/Post");
const canDo = require("../helpers/ACL");


const createPost = async (req, res) => {
    try {
        const data = req.body;
        data.authorId = req.userId;
        data.image = req.file.filename;

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

const getAllPosts = async (req, res) => {
    try {
        const category = req.query.category;
        const searchTerm = req.query.search;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        const query = {};
        if (category != undefined) {
            query.category = category;
        }

        if (searchTerm != undefined) {
            query.title = { $regex: searchTerm, $options: 'i' };
        }

        let posts = [];

        if (startDate != undefined && endDate != undefined) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) }
        }

        posts = await PostModel.find(query).populate("authorId", "name image");


        return res.json({
            status: "Ok",
            posts: posts
        });
    } catch (error) {

    }
}

const getAllPostsByUser = async (req, res) => {
    try {

        // const authorObjectId = new mongoose.Types.ObjectId(req.userId);

        const posts = await PostModel.find({ authorId: req.userId }).populate("authorId", "name image");

        return res.json({
            status: "Ok",
            posts: posts
        });
    } catch (error) {

    }
}

const getSinglePost = async (req, res) => {
    try {
        const id = req.params.id;

        // check mongod object id is correct ?

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(403).json({
                status: "Fail",
                errors: "Id is not valid"
            });
        }

        const post = await PostModel.findById(id).populate("authorId", "name image");


        return res.json({
            status: "Ok",
            post: post
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            errors: "Internal server error"
        });
    }
}

const postDelete = async (req, res) => {
    try {

        const authorId = req.userId;
        const postId = req.params.id;

        const role = req.role;

        

        const authorObjectId = new mongoose.Types.ObjectId(authorId);
        const postObjectId = new mongoose.Types.ObjectId(postId);

        // check user who is deleting is author of this post
        const post = await PostModel.findOne({ _id: postObjectId, authorId: authorObjectId });

        if (post === null) {
            return res.status(403).json({
                status: "Fail",
                errors: "Post not found or unauthorize to delete"
            });
        }


        if (canDo(role, 'delete') == false) {
            return res.status(403).json({
                status: "Fail",
                errors: "Unauthorize to delete"
            });
        }

        // delete a post
        await post.deleteOne();
        return res.status(200).json({
            status: "Ok",
            errors: "Post successfully deleted"
        });

    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            errors: error.message
        });
    }

}

module.exports = { createPost, getAllPosts, getSinglePost, postDelete, getAllPostsByUser }