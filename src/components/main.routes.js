const express = require("express");
const router = express.Router();

const booksRouter = require("./book/book.router");
const userRouter = require("./user/user.router");
const borrowBookRouter = require("./borrowings/borrowings.router");

router.use("/book", booksRouter);
router.use("/user", userRouter);
router.use("/borrowings", borrowBookRouter);

module.exports = router;
