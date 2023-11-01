const express = require("express");
const router = express.Router();

const booksRouter = require("./book/book.router");
const userRouter = require("./user/user.router");
const borrowBookRouter = require("./borrowings/borrowings.router");
const authRouter = require("./auth/auth.router");

router.use("/book", booksRouter);
router.use("/user", userRouter);
router.use("/borrowings", borrowBookRouter);
router.use("/auth", authRouter);

module.exports = router;
