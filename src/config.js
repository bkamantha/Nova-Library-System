require("dotenv").config();

const URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  PORT,
  URL,
  SECRET_KEY,
};
