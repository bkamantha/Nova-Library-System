const Borrowings = require("./borrowings.model");
const User = require("../user/user.model");
const Book = require("../book/book.model");
const { CommandStartedEvent } = require("mongodb");

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
    user: {
      _id: user._id,
      name: user.name,
    },
    book: {
      _id: book._id,
      name: book.name,
    },
    isReturned: savedBorrowing.isReturned,
  };
};

const returnBookService = async (data) => {
  const borrowing = await Borrowings.findOne({ book: data.bookId });
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

const getAllBorrowedBooksService = async () => {
  return await Borrowings.find().populate("user").populate("book");
};

const getUserBorrowedBooksService = async (userId) => {
  return await Borrowings.find({ user: userId }).populate("book");
};

module.exports = {
  borrowBookService,
  returnBookService,
  getAllBorrowedBooksService,
  getUserBorrowedBooksService,
};
