const {
  borrowBookService,
  returnBookService,
  getAllBorrowedBooksService,
  getUserBorrowedBooksService,
} = require("./borrowings.service");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const borrowBook = async (req, res) => {
  try {
    const borrowing = await borrowBookService(req.params.id, req.body);
    res.status(201).json(borrowing);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const returnBook = async (req, res) => {
  try {
    const borrowing = await returnBookService(req.params.id);
    res.status(200).json(borrowing);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const getAllBorrowedBooks = async (req, res) => {
  try {
    const borrowings = await getUserBorrowedBooksService(req.query);
    res.status(200).json(borrowings);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const getUserBorrowedBooks = async (req, res) => {
  try {
    const borrowings = await getAllBorrowedBooksService(
      req.params.id,
      req.query
    );
    res.status(200).json(borrowings);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getAllBorrowedBooks,
  getUserBorrowedBooks,
};
