const { loginUserService, loginOutService } = require("./auth.service");
const { errorResponse } = require("../../middleware/error-handling-middleware");

const loginUser = async (req, res) => {
  try {
    //TODO dont pass req.body directly pass nesseary items
    const userinfo = await loginUserService(req.body);
    res.status(200).json(userinfo);
  } catch (error) {
    errorResponse(error, req, res);
  }
};

module.exports = {
  loginUser,
};
