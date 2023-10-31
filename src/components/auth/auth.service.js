const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Auth = require("./auth.model");
const User = require("../user/user.model");

const loginUserService = async (data) => {
  const auth = await Auth.findOne({ _id: data.userID });
  const user = await User.findOne({ authId: auth._id });

  if (!auth) {
    throw new Error("User auth not found");
  }

  const validPassword = await bcrypt.compare(data.password, auth.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { _id: auth._id, type: user.type },
    "YOUR_SECRET_KEY",
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { loginUserService };
