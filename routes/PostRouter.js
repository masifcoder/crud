const express = require("express");
const upload = require("../helpers/ImageUpload");




const { createPost, getAllPosts, getSinglePost, postDelete, getAllPostsByUser } = require("../controllers/PostController");

const postRouter = express.Router();
const AuthCheck = require("../middlewares/AuthCheck");

postRouter.post("/create", [AuthCheck, upload.single("image")] , createPost);
postRouter.get("/all", getAllPosts);

postRouter.get("/all/user", AuthCheck, getAllPostsByUser);

postRouter.get("/get/:id", getSinglePost);
postRouter.delete("/delete/:id", AuthCheck, postDelete);



module.exports = postRouter