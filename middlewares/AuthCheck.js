require('dotenv').config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const AuthCheck = async (req, res, next) => {

    try {
        const authHeader = req.header("Authorization");


        // check header is available
        if (!authHeader) {
            return res.status(403).json({
                status: "Fail",
                message: "Token not found",
            });
        }

        const token = authHeader.split(" ")[1];

        // check token is available
        if (!token) {
            return res.status(403).json({
                status: "Fail",
                message: "Token not found",
            });
        }

        // verify token is correct
        const encoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = encoded.id;
        const user = await userModel.findById(encoded.id);
        req.role = user.role;
        
        console.log(user);

        next();



    } catch (error) {
        return res.status(401).json({
            status: "Fail",
            message: "Authentication failed",
        });
    }

}

module.exports = AuthCheck;