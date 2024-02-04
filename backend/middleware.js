const { JWT_SECRET } = require("../backend/config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(403).json({})
    }

    try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }

}

module.exports = {
    authMiddleware
}