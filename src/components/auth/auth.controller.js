const { loginUserService, loginOutService } = require("./auth.service");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const loginUser = async (req, res) => {
  try {
    const userinfo = await loginUserService(req.body);
    res.status(200).json(userinfo);
  } catch (error) {
    errorResponse(error, req, res);
  }
};
const logoutUser = async (req, res) => {
  try {
    const tokenstat = await loginOutService(req.body);
    res.status(201).json(tokenstat);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
