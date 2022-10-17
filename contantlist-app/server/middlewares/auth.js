const jwt = require("jsonwebtoken");
const Error = require("./error");
const User = require("../models/User");
exports.auth = async function (req, res, next) {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // set token from bearer token in  header
        token = req.headers.authorization.split(" ")[1];
    }
    //check if not token 
    if (  !req.headers.authorization || !token) {
        return res.status(401).json(Error("No token ,authentication denied"));
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }

}
