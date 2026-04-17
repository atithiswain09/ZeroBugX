const express = require("express");
const router = express.Router();
const {
  SignUp,
  Login,
  LogOut,
  checkAuth,
} = require("../controller/userAuth.Controller");
const { AuthMiddleware } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validators");

// Auth routes with rate limiting and validation
router.post("/signup", authLimiter, signupValidation, SignUp);
router.post("/login", authLimiter, loginValidation, Login);
router.post("/logout", LogOut);
router.get("/check-auth", AuthMiddleware, checkAuth);

module.exports = router;
