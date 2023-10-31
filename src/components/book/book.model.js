const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalCopies: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
  },
});

// BookSchema.pre("save", function (next) {
//   this.availableCopies = this.totalCopies;
//   next();
// });

module.exports = mongoose.model("Book", BookSchema);
