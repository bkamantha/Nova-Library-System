const Joi = require("joi");

exports.borrowBookSchema = Joi.object({
  userId: Joi.string().email().required(),
  bookId: Joi.string().required(),
  active_borrowings: Joi.boolean(),
});

exports.returnBookSchema = Joi.object({
  userId: Joi.string().email().required(),
  bookId: Joi.string().required(),
  active_borrowings: Joi.boolean().required(),
});

exports.getSelfBorrowedBooksSchema = Joi.object({
  userId: Joi.string().email().required(),
  active_borrowings: Joi.boolean().required(),
});

exports.getUserBorrowedBooksSchema = Joi.object({
  userId: Joi.string().email().required(),
  active_borrowings: Joi.boolean(),
});
