const errorResponse = async (err, req, res, next) => {
  console.log({ error: err.toString() });
  res.status(500).send({ error: "Something broke!" });
};

module.exports = { errorResponse };
