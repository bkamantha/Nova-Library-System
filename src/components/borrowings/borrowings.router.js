const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getAllBorrowedBooks,
  getUserBorrowedBooks,
} = require("./borrowings.controller");

router.post("/", borrowBook);

router.put("/", returnBook);

router.get("/", getAllBorrowedBooks);

router.get("/", getUserBorrowedBooks);

module.exports = router;
