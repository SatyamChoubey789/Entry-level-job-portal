const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const process = require("express")

// Generate a verification token for a given user ID
exports.generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.VERIFICATION_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

// Verify a verification token and return the user ID
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET).userId;
};

// Middleware to verify JWT tokens (access tokens) and attach user information to the request
exports.verifyJWT = async (req, res, next) => {
  try {
    // Extract the token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized request' });
    }

    // Verify the token and extract user ID
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findById(userId).select('-password -refreshToken');

    if (!user) {
      return res.status(401).json({ error: 'Invalid Access Token' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: error.message || 'Invalid access token' });
  }
};
