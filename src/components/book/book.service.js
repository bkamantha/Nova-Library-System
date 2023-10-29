const Book = require("./book.model");

const createBookService = async (data) => {
  const book = new Book({
    name: data.name,
    totalCopies: data.totalCopies,
  });
  try {
    return await book.save();
  } catch (error) {
    console.error(error);
  }
};

const updateBookService = async (data) => {
  const book = await Book.findById(data.id);

  if (!book) {
    throw new Error("Not Found with this ID");
  }

  book.name = data.name || book.name;
  book.totalCopies = data.totalCopies || book.totalCopies;

  try {
    return await book.save();
  } catch (error) {
    console.error(error);
  }
};

const deleteBookService = async (data) => {
  const book = await Book.findByIdAndRemove(data.id);

  if (!book) {
    throw new Error("Not Found with this ID");
  }
};

const allBooksService = async () => {
  return await Book.find({}, "name availableCopies");
};

module.exports = {
  createBookService,
  updateBookService,
  deleteBookService,
  allBooksService,
};
