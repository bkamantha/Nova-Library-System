const express = require('express');
const router = express.Router();

const booksRouter = require('./book/book.router');

router.use('/book', booksRouter);

module.exports = router