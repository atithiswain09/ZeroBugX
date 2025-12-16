const express = require("express");
const router = express.Router();
const { SignUp, Login, LogOut } = require("../controller/userAuth.Controller");

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", LogOut);

module.exports = router;
