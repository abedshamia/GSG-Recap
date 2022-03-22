const errorHandler = (err, req, res, next) => {
  if (err.code) {
    return res.status(err.code).json({
      status: err.code,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

module.exports = errorHandler;
