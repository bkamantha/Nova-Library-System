const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  authId: String,
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

module.exports = mongoose.model("Users", UserSchema);
