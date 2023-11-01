const jwt = require("jsonwebtoken");

//TODO move project secret to .env

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access Denied: No Authorization header");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, "YOUR_SECRET_KEY");
    req.user = verified;

    req.user.isAdmin = verified.type === "Admin";

    // console.log("User type:", verified.type);
    // console.log("Is Admin:", req.user.isAdmin);

    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { authMiddleware };
