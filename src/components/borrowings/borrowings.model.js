const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  User: {
    _id: {
      type: String,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  book: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Borrowing", borrowingSchema);
