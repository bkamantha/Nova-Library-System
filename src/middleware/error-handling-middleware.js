const errorResponse = async (err, req, res, next) => {
  console.error({ error: err.toString() });

  if (err instanceof SomeSpecificError) {
    res.status(400).send({ error: "A specific thing went wrong!" });
  } else {
    res.status(500).send({ error: "Something broke!" });
  }
};

module.exports = { errorResponse };
