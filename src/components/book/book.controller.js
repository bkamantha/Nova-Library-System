const bookService = require("./book.service");

exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.body);
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    res.sent("test deleteBook");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.allBooks = async (req, res) => {
  try {
    res.send([
      {
        name: "Book 1",
        totalCopies: 5,
      },
      {
        name: "Book 2",
        totalCopies: 7,
      },
      {
        name: "Book 3",
        totalCopies: 3,
      },
    ]);
  } catch (error) {
    res.status(500).send(error);
  }
};
