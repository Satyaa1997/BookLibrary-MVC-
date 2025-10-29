// controllers/bookController.js
const Book = require("../models/bookModel");

// CREATE
exports.createBook = async (req, res) => {
  try {
    await Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    res.status(500).send(err);
  }
};

// READ
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
};

// EDIT PAGE
exports.editBookPage = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("editBook", { book });
};

// UPDATE
exports.updateBook = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/books");
};

// DELETE
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/books");
};
