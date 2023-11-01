const express = require("express");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { validate } = require("../../middleware/validateMiddleware");
const router = express.Router();

const {
  borrowBook,
  returnBook,
  getSelfBorrowedBooks,
  getUserBorrowedBooks,
} = require("./borrowings.controller");

const {
  borrowBookSchema,
  returnBookSchema,
  getSelfBorrowedBooksSchema,
  getUserBorrowedBooksSchema,
} = require("./borrowings.schema");

router.post("/", validate(borrowBookSchema), borrowBook);
router.put("/", authMiddleware, validate(returnBookSchema), returnBook);
router.get(
  "/self",
  authMiddleware,
  validate(getSelfBorrowedBooksSchema),
  getSelfBorrowedBooks
);
router.get(
  "/",
  authMiddleware,
  validate(getUserBorrowedBooksSchema),
  getUserBorrowedBooks
);

module.exports = router;
