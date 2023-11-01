const jwt = require("jsonwebtoken");
const { loginUserService } = require("./auth.service");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const loginUser = async (req, res) => {
  try {
    const { auth, user } = await loginUserService(req.body);

    const token = jwt.sign(
      { _id: auth?._id, type: user?.type },
      "YOUR_SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userName: auth._id, userId: user.name });
  } catch (error) {
    errorResponse(error, req, res);
  }
};

module.exports = {
  loginUser,
};
