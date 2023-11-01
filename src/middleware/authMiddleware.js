const jwt = require("jsonwebtoken");
const config = require("../config");

const { SECRET_KEY } = config;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access Denied: No Authorization header");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;

    req.user.isAdmin = verified.type === "Admin";

    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { authMiddleware };
