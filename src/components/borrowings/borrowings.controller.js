const {
  borrowBookService,
  returnBookService,
  getAllBorrowedBooksService,
  getSelfBorrowedBooksService,
} = require("./borrowings.service");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const borrowBook = async (req, res) => {
  try {
    const borrowing = await borrowBookService(req.body);
    res.status(201).json(borrowing);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const returnBook = async (req, res) => {
  try {
    const borrowing = await returnBookService(req.body);
    res.status(200).json(borrowing);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const getSelfBorrowedBooks = async (req, res) => {
  if (req.user.isAdmin) {
    return res.status(403).send("Access Denied: Only regular user access");
  }
  try {
    const borrowings = await getSelfBorrowedBooksService(req.body);
    res.status(200).json(borrowings);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

const getUserBorrowedBooks = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access Denied: Only admins can access");
  }
  try {
    const borrowings = await getAllBorrowedBooksService(req.body);
    res.status(200).json(borrowings);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getSelfBorrowedBooks,
  getUserBorrowedBooks,
};
