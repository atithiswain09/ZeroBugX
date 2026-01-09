const express = require("express");
const router = express.Router();
const ai=require("../controller/ai.controller");
 const {AuthMiddleware}=require("../middleware/authMiddleware")
router.post("/",AuthMiddleware,ai);




module.exports=router;