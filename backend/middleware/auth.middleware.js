// TirthConstruction/backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    // 1. Get token from the 'x-auth-token' header
    const token = req.header('x-auth-token');

    // 2. Check if no token is present
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify the token if it exists
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach user payload from the token to the request object
        req.user = decoded.user;

        // 5. Move on to the next function (the actual route handler)
        next();
    } catch (err) {
        // If token is not valid (e.g., expired, incorrect secret)
        res.status(401).json({ msg: 'Token is not valid' });
    }
};