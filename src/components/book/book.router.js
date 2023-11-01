const express = require("express");
const router = express.Router();
const {
  allBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const { authMiddleware } = require("../../middleware/auth-Middleware");

router.get("/", allBooks);
router.post("/create", authMiddleware, createBook);
router.put("/", authMiddleware, updateBook);
router.delete("/", authMiddleware, deleteBook);

module.exports = router;
