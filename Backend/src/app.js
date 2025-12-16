const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const AuthRouter = require("../src/routes/Auth.routes");
const ai=require("../src/routes/ai.routes");
//  STEP 1: CORS MUST BE FIRST (before body parser)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// STEP 2: Body Parser (AFTER CORS, BEFORE ROUTES)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added for form data
app.use(cookieParser());

// STEP 3: Routes (LAST)
app.use("/api/V1/auth", AuthRouter);
app.use("/ai",ai)

module.exports = app;
