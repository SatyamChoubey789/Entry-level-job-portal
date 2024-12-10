const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// app
const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))