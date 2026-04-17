const { body, validationResult } = require("express-validator");

/**
 * Middleware to check for validation errors and return 422 if any exist.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for user signup.
 */
const signupValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

  handleValidationErrors,
];

/**
 * Validation rules for user login.
 */
const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors,
];

/**
 * Validation rules for AI prompt.
 */
const aiPromptValidation = [
  body("prompt")
    .trim()
    .notEmpty()
    .withMessage("Prompt is required")
    .isLength({ max: 5000 })
    .withMessage("Prompt must be under 5000 characters"),

  body("code")
    .optional()
    .isLength({ max: 50000 })
    .withMessage("Code must be under 50000 characters"),

  handleValidationErrors,
];

module.exports = {
  signupValidation,
  loginValidation,
  aiPromptValidation,
  handleValidationErrors,
};
