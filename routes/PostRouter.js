const express = require("express");

const { createPost } = require("../controllers/PostController");

const postRouter = express.Router();
const AuthCheck = require("../middlewares/AuthCheck");

postRouter.post("/create", AuthCheck, createPost);


module.exports = postRouter