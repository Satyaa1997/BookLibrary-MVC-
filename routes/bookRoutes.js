const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authController = require("../controllers/authController");

// ✅ Middleware – Check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next(); // user logged in -> continue
  } else {
    res.redirect("/login"); // not logged in -> go to login page
  }
}

// ✅ Default route — show login first
router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


// ✅ Register Routes
router.get("/register", authController.registerPage);
router.post("/register", authController.registerUser);

// ✅ Login Routes
router.get("/login", authController.loginPage);
router.post("/login", authController.loginUser);

// ✅ Logout
router.get("/logout", authController.logoutUser);

// ✅ Home page (after login)
router.get("/home", isAuthenticated, (req, res) => {
  res.render("home", { user: req.session.user });
});

// ✅ All Books
router.get("/books", isAuthenticated, bookController.getAllBooks);

// ✅ Add Book page
router.get("/addBook", isAuthenticated, (req, res) => {
  res.render("addBook");
});

// ✅ Create Book
router.post("/books", isAuthenticated, bookController.createBook);

// ✅ Edit Book
router.get("/books/edit/:id", isAuthenticated, bookController.editBookPage);

// ✅ Update Book
router.post("/books/edit/:id", isAuthenticated, bookController.updateBook);

// ✅ Delete Book
router.get("/books/delete/:id", isAuthenticated, bookController.deleteBook);

module.exports = router;
