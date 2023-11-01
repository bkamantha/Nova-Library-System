const mongoose = require("mongoose");
const AuthSchema = require("../auth/auth.model");

const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
    ref: "Auth",
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
