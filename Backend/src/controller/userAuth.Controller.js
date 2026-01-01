const User = require("../models/userAuth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  try {
    
    const { username, email, password } = req.body;
    
   
    // Validate input - FIXED: Changed "name" to "username"
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check if user already exists by email OR username
    const ExistingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (ExistingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user - FIXED: Changed "name" to "username"
    const user = await User.create({
      username,  
      email,
      password: hashedPassword,
    });

    // Remove password from response - FIXED: Changed "name" to "username"
    const userResponse = {
      _id: user._id,
      username: user.username,  
      email: user.email,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: userResponse,
    });
  } catch (e) {
    console.error("SignUp Error:", e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const CheckUser = await User.findOne({ email });
    if (!CheckUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, CheckUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: CheckUser._id, email: CheckUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send response - FIXED: Changed "name" to "username"
    return res.status(200).json({
      success: true,
      message: `Welcome back ${CheckUser.username}`,  
      user: {
        _id: CheckUser._id,
        username: CheckUser.username,  // ✅ Changed from "name"
        email: CheckUser.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const LogOut = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error logging out",
    });
  }
};

module.exports = { SignUp, Login, LogOut };