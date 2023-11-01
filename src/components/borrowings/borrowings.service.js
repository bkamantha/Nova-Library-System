const Borrowings = require("./borrowings.model");
const User = require("../user/user.model");
const Book = require("../book/book.model");
const mongoose = require("mongoose");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const borrowBookService = async (data) => {
  const [user, book] = await Promise.all([
    User.findOne({ authId: data.userId }),
    Book.findById(data.bookId),
  ]);

  assert(user, "User not found");
  assert(book, "Book not found");
  assert(book.availableCopies > 0, "No available copies of the book");

  const existingBorrowing = await Borrowings.findOne({
    "User._id": data.userId,
    "book._id": book._id,
    isReturned: false,
  });
  assert(!existingBorrowing, "User has already borrowed this book");

  book.availableCopies -= 1;

  const savedBook = await book.save();

  assert(savedBook, "Failed to update book record");

  const borrowing = new Borrowings({
    _id: new mongoose.Types.ObjectId(),
    User: {
      _id: data.userId,
      name: user.name,
    },
    book: {
      _id: book._id,
      name: book.name,
    },
    isReturned: false,
  });

  const savedBorrowing = await borrowing.save();

  return {
    userName: data.userId,
    bookName: book.name,
    isReturned: savedBorrowing.isReturned,
  };
};

const returnBookService = async (data) => {
  const borrowing = await Borrowings.findOne({
    "User._id": data.userId,
    "book._id": data.bookId,
  });

  assert(borrowing, "Borrowing not found");

  const book = await Book.findById(data.bookId);
  assert(book, "Book not found");

  borrowing.isReturned = true;

  book.availableCopies += 1;

  assert(book.availableCopies <= book.totalCopies);

  await Promise.all([book.save(), borrowing.save()]);

  return borrowing;
};

const getSelfBorrowedBooksService = async (data) => {
  let query = { "User._id": data.userId };
  if (data.active_borrowings === "true") {
    query.isReturned = true;
  }
  const borrowings = await Borrowings.find(query).populate("book");
  return borrowings.map((borrowing) => borrowing.book.name);
};

const getAllBorrowedBooksService = async (data) => {
  let query = {};

  if (data.userId) {
    query["User._id"] = data.userId;
  }
  if (data.active_borrowings === "true") {
    query.isReturned = true;
  } else if (data.active_borrowings === "false") {
    query.isReturned = false;
  }

  const borrowings = await Borrowings.find(query)
    .populate("User")
    .populate("book");

  return borrowings.map((borrowing) => ({
    userId: borrowing.User.name,
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
