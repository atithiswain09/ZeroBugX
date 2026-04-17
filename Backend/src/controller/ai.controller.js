const aiService = require("../services/ai.service");

/**
 * @route   POST /api/V1/ai
 * @desc    Send code and prompt to AI for review
 */
const ai = async (req, res) => {
  try {
    const { prompt, code } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    const response = await aiService(prompt, code || "");

    return res.status(200).json({
      success: true,
      message: "AI review generated successfully.",
      response,
    });
  } catch (error) {
    console.error("[AI Controller] Error:", error.message);

    // Handle specific AI API errors
    if (error.message?.includes("API key")) {
      return res.status(503).json({
        success: false,
        message: "AI service is temporarily unavailable.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI review. Please try again.",
    });
  }
};

module.exports = ai;