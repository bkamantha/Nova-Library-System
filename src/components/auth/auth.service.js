const bcrypt = require("bcrypt");

const Auth = require("./auth.model");
const User = require("../user/user.model");

const loginUserService = async (data) => {
  const auth = await Auth.findOne({ _id: data?.userID });
  const user = await User.findOne({ authId: auth?._id });

  if (!auth) {
    throw new Error("User auth not found");
  }

  const validPassword = await bcrypt.compare(data?.password, auth?.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }
  return { auth, user };
};

module.exports = { loginUserService };
