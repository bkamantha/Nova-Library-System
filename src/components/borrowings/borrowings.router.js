const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getSelfBorrowedBooks,
  getUserBorrowedBooks,
} = require("./borrowings.controller");

router.post("/", borrowBook);

router.put("/", returnBook);

router.get("/self", getSelfBorrowedBooks);

router.get("/", getUserBorrowedBooks);

module.exports = router;
