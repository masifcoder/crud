const express = require("express");

const userRouter = express.Router();
const  { Signup, Login } = require("../controllers/UserController");


userRouter.post("/signup", Signup);
userRouter.post("/login", Login);


module.exports = userRouter;