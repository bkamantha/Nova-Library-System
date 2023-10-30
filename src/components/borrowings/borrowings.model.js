const mongoose = require("mongoose");

const BorrowingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Borrowings", BorrowingSchema);
