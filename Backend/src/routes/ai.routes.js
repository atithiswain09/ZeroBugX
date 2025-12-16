const express = require("express");
const router = express.Router();
const ai=require("../controller/ai.controller");

router.post("/",ai);




module.exports=router;