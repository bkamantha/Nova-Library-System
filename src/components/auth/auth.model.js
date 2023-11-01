const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      alias: "userID",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { id: false }
);

module.exports = mongoose.model("Auth", AuthSchema);
