require("dotenv").config();

const URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 3000;

module.exports = {
  PORT,
  URL,
};
