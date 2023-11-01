const express = require("express");
const { authMiddleware } = require("../../middleware/authMiddleware");
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

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

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
