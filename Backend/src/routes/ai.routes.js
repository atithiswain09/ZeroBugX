const express = require("express");
const router = express.Router();
const ai = require("../controller/ai.controller");
const { AuthMiddleware } = require("../middleware/authMiddleware");
const { aiPromptValidation } = require("../middleware/validators");

// AI route - requires authentication and validates input
router.post("/", AuthMiddleware, aiPromptValidation, ai);

module.exports = router;