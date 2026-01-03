const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/userRoute");

// ✅ LOAD ENV FIRST
dotenv.config();

const app = express();

// ✅ Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.114.0.2:5173",      // Web Server Private IP
      "http://139.59.209.13:5173"    // Web Server Public IP
    ],
    credentials: true
  })
);

// ✅ Config
const PORT = process.env.PORT || 5000;
// Fallback to Private DB IP if .env is missing
const MONGO_URL = process.env.MONGODB_URL || "mongodb://10.114.0.4:27017/zero_trust_project";

// ✅ Routes
app.use("/api", route);

// ✅ DB + Server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ DB connected successfully");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
