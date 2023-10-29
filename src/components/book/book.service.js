const Book = require("./book.model");
const { createbookSchema, updatebookSchema } = require("./book.schema");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const createBookService = async (data) => {
  const { error } = createbookSchema.validate(data);
  if (error) return errorResponse(error.details[0].message);

  const book = new Book({
    name: data.name,
    totalCopies: data.totalCopies,
  });
  try {
    return await book.save();
  } catch (error) {
    return errorResponse(error);
  }
};

const updateBookService = async (data) => {
  const book = await Book.findById(data.id);

  const { error } = updatebookSchema.validate(data);
  if (error) return errorResponse(error.details[0].message);

  if (!book) {
    return errorResponse("Not Found with this ID");
  }

  book.name = data.name || book.name;
  book.totalCopies = data.totalCopies || book.totalCopies;

  try {
    return await book.save();
  } catch (error) {
    return errorResponse(error);
  }
};

const deleteBookService = async (data) => {
  const book = await Book.findByIdAndRemove(data.id);

  if (!book) {
    return errorResponse("Not Found with this ID");
  }
};

const allBooksService = async () => {
  try {
    return await Book.find({}, "name availableCopies");
  } catch (error) {
    return errorResponse(error);
  }
};

module.exports = {
  createBookService,
  updateBookService,
  deleteBookService,
  allBooksService,
};
