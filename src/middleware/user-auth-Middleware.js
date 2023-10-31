const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, "YOUR_SECRET_KEY");
    req.user = verified;

    console.log("User type:", verified.type); // You can now access the user's type

    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { authMiddleware };
