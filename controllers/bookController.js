const Book = require('../models/BookModel');
const { cloudinary } = require("../config/cloudinaryConfig");
const upload = require('../config/multerConfig');
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ data: books, message: "Books retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ data: book, message: "Book retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.addBook = async (req, res) => {
  try {

    const existingBook = await Book.findOne({title: req.body.title});
    if (existingBook) return res.status(400).json({ message: "Book with the same title already exists" });
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

        // ✅ Parse `chapters` if it's sent as a JSON string
        let chapters = [];
        if (req.body.chapters) {
          try {
            chapters = JSON.parse(req.body.chapters); // Convert string to array
          } catch (error) {
            return res.status(400).json({ error: "Invalid chapters format" });
          }
        }
    

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      status: req.body.status,
      categories: req.body.categories,
      genre: req.body.genre,
      year: req.body.year,
      image: cloudinaryResult.secure_url,
      chapters: chapters, 
    });

    await newBook.save();
    res.status(201).json({ data: newBook, message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error); // Log detailed error
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
};



exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ data: updatedBook, message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
