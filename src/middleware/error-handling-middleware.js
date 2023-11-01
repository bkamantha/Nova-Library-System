const errorResponse = async (err, req, res, next) => {
  console.error({ error: err.toString() });
  res.status(500).send({ error: "Something broke!" });
};

module.exports = { errorResponse };
