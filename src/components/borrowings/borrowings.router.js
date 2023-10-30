const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getAllBorrowedBooks,
  getUserBorrowedBooks,
} = require("./borrowings.controller");

router.post("/:id", borrowBook);

router.put("/:id", returnBook);

router.get("/", getAllBorrowedBooks);

router.get("/:id", getUserBorrowedBooks);

module.exports = router;
