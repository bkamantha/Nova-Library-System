const express = require("express");
const router = express.Router();

const booksRouter = require("./book/book.router");
const userRouter = require("./user/user.router");

router.use("/book", booksRouter);
router.use("/user", userRouter);

module.exports = router;
