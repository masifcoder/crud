
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const secretKey = "342qwsdfasdfdgt24rwsddfvb%#$@$%%*&ds24r2rsvdsvd";
const jwt = require("jsonwebtoken");

// singup api

const Signup = async (req, res) => {
    try {

        const data = req.body;

        // check user already registered
        const already = await UserModel.findOne({ email: data.email });

        if (already !== null) {
            return res.status(403).json({
                status: "Fail",
                message: "Email is already registered"
            });
        }

        // hash the password
        const hashed = bcrypt.hashSync(data.password, 10);

        await UserModel.create({
            name: data.name,
            email: data.email,
            password: hashed
        });

        return res.status(201).json({
            status: "Ok",
            message: "Successfully signed up"
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


// login api

const Login = async (req, res) => {
    try {

        const data = req.body;

        // check user is registered
        const user = await UserModel.findOne({ email: data.email });

        if (user === null) {
            return res.status(403).json({
                status: "Fail",
                message: "username or password is incorrect e"
            });
        }

        //console.log(user);



        // check password is correct
        const passStatus = bcrypt.compareSync(data.password, user.password);

        if (passStatus === false) {
            return res.status(403).json({
                status: "Fail",
                message: "username or password is incorrect p"
            });
        }

        // generate a jwt token
        const token = jwt.sign({ id: user._id }, secretKey, {expiresIn: "2h"});

        return res.status(200).json({
            status: "Ok",
            message: "Successfully logged in",
            token: token
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





module.exports = { Signup, Login }