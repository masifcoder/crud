const express = require("express");
const upload = require("../helpers/ImageUpload");




const { createPost, getAllPosts, getSinglePost } = require("../controllers/PostController");

const postRouter = express.Router();
const AuthCheck = require("../middlewares/AuthCheck");

postRouter.post("/create", [AuthCheck, upload.single("image")] , createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/get/:id", getSinglePost)


module.exports = postRouter