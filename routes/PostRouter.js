const express = require("express");
const upload = require("../helpers/ImageUpload");




const { createPost, getAllPosts } = require("../controllers/PostController");

const postRouter = express.Router();
const AuthCheck = require("../middlewares/AuthCheck");

postRouter.post("/create", [AuthCheck, upload.single("image")] , createPost);
postRouter.get("/all", getAllPosts);


module.exports = postRouter