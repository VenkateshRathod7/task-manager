// authenticateJWT.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');  // Make sure to define your secret key in a config file

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, SECRET_KEY);  // Decoding the token using the secret key
        req.user = decoded;  // Attach the decoded user data to the request object
        next();  // Call next middleware or route handler
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });  // Token is invalid or expired
    }
};

module.exports = authenticateJWT;
