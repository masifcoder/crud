
const secretKey = "342qwsdfasdfdgt24rwsddfvb%#$@$%%*&ds24r2rsvdsvd";
const jwt = require("jsonwebtoken");

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
        const encoded = jwt.verify(token, secretKey);
        req.userId = encoded.id;

        next();



    } catch (error) {
        return res.status(403).json({
            status: "Fail",
            message: "Authentication failed",
        });
    }

}

module.exports = AuthCheck;