const mongoose = require("mongoose");

const codeSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      trim: true,
      default: "Untitled Review",
      maxlength: [100, "Title must be under 100 characters"],
    },
    userPrompt: {
      type: String,
      required: [true, "Prompt is required"],
      maxlength: [5000, "Prompt must be under 5000 characters"],
    },
    code: {
      type: String,
      default: "",
      maxlength: [50000, "Code must be under 50000 characters"],
    },
    aiResponse: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CodeSubmission", codeSubmissionSchema);