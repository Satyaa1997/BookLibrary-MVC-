const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// 🟢 GET — Register Page
exports.registerPage = (req, res) => {
  res.render("register");
};

// 🟢 POST — Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed });
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error in registration: " + err.message);
  }
};

// 🟢 GET — Login Page
exports.loginPage = (req, res) => {
  res.render("login");
};

// 🟢 POST — Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");

    req.session.user = user;
    res.redirect("/home"); // ✅ अब login के बाद home page खुलेगा
  } catch (err) {
    res.status(500).send("Login error: " + err.message);
  }
};

// 🟢 GET — Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
