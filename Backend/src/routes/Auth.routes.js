const express = require("express");
const router = express.Router();
const { SignUp, Login, LogOut,checkAuth } = require("../controller/userAuth.Controller");
const {AuthMiddleware}=require("../middleware/authMiddleware");
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", LogOut);
router.get("/check-auth",AuthMiddleware,checkAuth);



module.exports = router;
