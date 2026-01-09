const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const AuthRouter = require("../src/routes/Auth.routes");
const ai=require("../src/routes/ai.routes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added for form data
app.use(cookieParser());


app.use("/api/V1/auth", AuthRouter);
app.use("/api/V1/ai",ai)

module.exports = app;
