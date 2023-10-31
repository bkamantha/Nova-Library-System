const Borrowings = require("./borrowings.model");
const User = require("../user/user.model");
const Book = require("../book/book.model");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const borrowBookService = async (data) => {
  const [user, book] = await Promise.all([
    User.findById(data.userId),
    Book.findById(data.bookId),
  ]);

  assert(user, "User not found");
  assert(book, "Book not found");
  assert(book.availableCopies > 0, "No available copies of the book");

  book.availableCopies -= 1;

  const savedBook = await book.save();

  assert(savedBook, "Failed to update book record");

  const borrowing = new Borrowings({
    user: user._id,
    book: book._id,
    isReturned: false,
  });

  const savedBorrowing = await borrowing.save();

  return {
    userName: user.name,
    bookName: book.name,
    isReturned: savedBorrowing.isReturned,
  };
};

const returnBookService = async (data) => {
  const borrowing = await Borrowings.findOne({
    user: data.userId,
    book: data.bookId,
  });
  assert(borrowing, "Borrowing not found");

  const book = await Book.findById(data.bookId);
  assert(book, "Book not found");

  if (data.active_borrowings) {
    borrowing.isReturned = true;
    book.availableCopies += 1;
    assert(
      book.availableCopies <= book.totalCopies,
      "Available copies cannot exceed total copies"
    );
    await book.save();
  }

  return await borrowing.save();
};

const getSelfBorrowedBooksService = async (data) => {
  let query = { user: data.userId };
  if (data.active_borrowings === "true") {
    query.isReturned = true;
  }
  const borrowings = await Borrowings.find(query).populate("book");
  return borrowings.map((borrowing) => borrowing.book.name);
};

const getAllBorrowedBooksService = async (data) => {
  let query = {};

  if (data.userId) {
    query.user = data.userId;
  }
  if (data.active_borrowings === "true") {
    query.isReturned = true;
  } else if (data.active_borrowings === "false") {
    query.isReturned = false;
  }

  const borrowings = await Borrowings.find(query)
    .populate("user")
    .populate("book");

  return borrowings.map((borrowing) => ({
    userId: borrowing.user.name,
    bookId: borrowing.book.name,
    active_borrowings: borrowing.isReturned,
  }));
};

module.exports = {
  borrowBookService,
  returnBookService,
  getAllBorrowedBooksService,
  getSelfBorrowedBooksService,
};
