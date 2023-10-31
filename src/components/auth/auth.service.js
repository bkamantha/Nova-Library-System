const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../user/user.model");

const loginUserService = async (data) => {
  const user = await User.findOne({ userID: data.userID });

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(data.password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { _id: user._id, authId: user.authId, type: user.type },
    "YOUR_SECRET_KEY",
    { expiresIn: "1h" }
  );

  return token;
};

const loginOutService = async (data) => {
  localStorage.removeItem("token");
};

module.exports = { loginUserService, loginOutService };
