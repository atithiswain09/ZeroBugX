const jwt = require("jsonwebtoken");
const userModel = require("../models/userAuth.model");

/**
 * Authentication middleware.
 * Verifies JWT from httpOnly cookie and attaches user to request.
 */
const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found. Please sign up again.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    // Differentiate between token expiration and other errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid session. Please log in again.",
      });
    }

    console.error("[AuthMiddleware] Unexpected error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Authentication error. Please try again.",
    });
  }
};

module.exports = { AuthMiddleware };
