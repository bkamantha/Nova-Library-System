const {
  createBookService,
  updateBookService,
  deleteBookService,
  allBooksService,
} = require("./book.service");

const { errorResponse } = require("../../middleware/error-handling-middleware");

const createBook = async (req, res) => {
  try {
    const book = await createBookService(req.body);
    res.status(201).send(book);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await updateBookService(req.body);
    res.status(201).send(book);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const deleteBook = async (req, res) => {
  try {
    await deleteBookService(req.query);
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const allBooks = async (req, res) => {
  try {
    const books = await allBooksService();
    res.send(books);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

module.exports = { createBook, updateBook, deleteBook, allBooks };
