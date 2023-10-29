const {
  createBookService,
  updateBookService,
  deleteBookService,
  allBooksService,
} = require("./book.service");

const createBook = async (req, res) => {
  try {
    const book = await createBookService(req.body);
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await updateBookService(req.body);
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

const deleteBook = async (req, res) => {
  try {
    await deleteBookService(req.query);
    res.send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
};

const allBooks = async (req, res) => {
  try {
    const books = await allBooksService();
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
};

module.exports = { createBook, updateBook, deleteBook, allBooks };
