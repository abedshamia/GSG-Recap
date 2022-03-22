const jwt = require('jsonwebtoken');
const {createError} = require('../errors/customError');
const verifyToken = async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    throw createError('Unauthorized', 401);
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const {id, name} = decodedToken;

    req.user = {id, name};
  } catch (error) {
    throw createError('Unauthorized', 401);
  }

  next();
};

module.exports = {verifyToken};
