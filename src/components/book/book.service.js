const Book = require("./book.model");

exports.createBook = async (data) => {
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

exports.updateBook = async (data) => {
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
