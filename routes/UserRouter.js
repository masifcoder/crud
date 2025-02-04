const express = require("express");
const upload = require("../helpers/ImageUpload");

const userRouter = express.Router();
const  { Signup, Login } = require("../controllers/UserController");


userRouter.post("/signup", upload.single('image'), Signup);
userRouter.post("/login", Login);


module.exports = userRouter;