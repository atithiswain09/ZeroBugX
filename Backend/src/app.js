const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// ─── Import Routes ──────────────────────────────────────────────
const AuthRouter = require("./routes/Auth.routes");
const aiRouter = require("./routes/ai.routes");

// ─── Import Middleware ──────────────────────────────────────────
const { apiLimiter } = require("./middleware/rateLimiter");

// ─── Security Headers ──────────────────────────────────────────
app.use(helmet());

// ─── Request Logging ────────────────────────────────────────────
app.use(morgan("dev"));

// ─── CORS Configuration ────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Body Parsers ───────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// ─── Global Rate Limiter ────────────────────────────────────────
app.use(apiLimiter);

// ─── Health Check ───────────────────────────────────────────────
app.get("/api/V1/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── API Routes ─────────────────────────────────────────────────
app.use("/api/V1/auth", AuthRouter);
app.use("/api/V1/ai", aiRouter);

// ─── 404 Handler ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("[Error]", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

module.exports = app;