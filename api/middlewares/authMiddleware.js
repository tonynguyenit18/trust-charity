const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).json({ msg: "Unauthorised! Token is not found." })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decodedToken && decodedToken.id) {
            req.userId = decodedToken.id;
            next()
        } else {
            res.status(400).json({ msg: "Token is invalid" })
        }
    } catch (error) {
        console.log("Decode token erro", error.message)
        res.status(400).json({ msg: "Token is invalid:" + error.message })
    }
}

module.exports = auth;