const handleHttpError = (res, message = "Algo sucedio", code = 403) => {
  res.status(code);
  res.send({ msg: message });
};

module.exports = { handleHttpError };
