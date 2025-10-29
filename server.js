// server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bookRoutes= require('./routes/bookRoutes');

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Session setup
app.use(
  session({
    secret: "librarySecret", // कोई भी random string
    resave: false,
    saveUninitialized: false,
  })
);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/libraryDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/", bookRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
