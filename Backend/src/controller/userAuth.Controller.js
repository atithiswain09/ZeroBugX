const User = require("../models/userAuth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ─── Cookie Configuration ───────────────────────────────────────
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: "/",
};

/**
 * Generate a JWT token for the given user.
 */
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

/**
 * @route   POST /api/V1/auth/signup
 * @desc    Register a new user
 */
const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return res.status(409).json({
        success: false,
        message: `A user with this ${field} already exists.`,
      });
    }

    // Hash password with bcrypt (12 salt rounds for production-grade security)
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(422).json({
        success: false,
        message: messages[0],
      });
    }

    console.error("[SignUp] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

/**
 * @route   POST /api/V1/auth/login
 * @desc    Authenticate user and return token
 */
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use generic message to prevent user enumeration
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.username}!`,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("[Login] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

/**
 * @route   POST /api/V1/auth/logout
 * @desc    Clear auth cookie and log out user
 */
const LogOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("[LogOut] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error logging out. Please try again.",
    });
  }
};

/**
 * @route   GET /api/V1/auth/check-auth
 * @desc    Verify current authentication status
 */
const checkAuth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User authenticated",
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
};

module.exports = {
  SignUp,
  Login,
  LogOut,
  checkAuth,
};
