const Borrowings = require("./borrowings.model");
const User = require("../user/user.model");
const Book = require("../book/book.model");

const borrowBookService = async (userId, bookId) => {
  const user = await User.findById(userId);
  const book = await Book.findById(bookId);

  if (!user || !book) {
    throw new Error("User or book not found");
  }

  const borrowing = new Borrowings({
    user: userId,
    book: bookId,
    isReturned: false,
  });

  return await borrowing.save();
};

const returnBookService = async (borrowingId) => {
  const borrowing = await Borrowings.findById(borrowingId);

  if (!borrowing) {
    throw new Error("Borrowing not found");
  }

  borrowing.isReturned = true;

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
