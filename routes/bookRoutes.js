const express = require("express");
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const {upload} = require('../config/cloudinaryConfig');
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/",upload.single("image"),addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
