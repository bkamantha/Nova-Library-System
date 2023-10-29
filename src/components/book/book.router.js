const express = require('express');
const router = express.Router();
const {allBooks,createBook,updateBook,deleteBook} = require('./book.controller');

router.get('/', allBooks);
router.post('/create', createBook);
router.put('/', updateBook);
router.delete('/',deleteBook)


module.exports = router