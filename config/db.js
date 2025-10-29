// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/libraryDB");
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
