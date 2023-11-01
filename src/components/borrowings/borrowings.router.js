const express = require("express");
const { authMiddleware } = require("../../middleware/auth-Middleware");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getSelfBorrowedBooks,
  getUserBorrowedBooks,
} = require("./borrowings.controller");

router.post("/", borrowBook);

router.put("/", authMiddleware, returnBook);

router.get("/self", authMiddleware, getSelfBorrowedBooks); //allow only regular users

router.get("/", authMiddleware, getUserBorrowedBooks); //allow only admins to view borrowings

module.exports = router;
