const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');
const bcrypt = require('bcrypt');
const validateSignup = require('../utils/validation/signupSchema');
const loginSchema = require('../utils/validation/loginSchema');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  const {name, password, email} = req.body;

  // Validate
  const {error} = await validateSignup
    .validateAsync(req.body, {abortEarly: false})
    .catch(error => {
      const errorMessage = error.details.map(detail => detail.message);
      throw createError(errorMessage, 400);
    });

  // Check if email exists

  const isExist = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

  if (isExist.rows[0]) {
    throw createError('Email already exists', 400);
  }

  // Hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user

  const user = await connection.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
    [name, hashedPassword, email]
  );

  res.status(201).json({
    status: 201,
    user: user.rows[0],
  });
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  // Validate

  const {error} = await loginSchema.validateAsync(req.body, {abortEarly: false});

  if (error) {
    const errorMessage = error.details.map(detail => detail.message);
    return res.status(400).json({error: errorMessage});
  }

  // Check if user exists

  const isExist = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!isExist.rows[0]) {
    throw createError('User does not exist', 400);
  }

  // Check if password is correct

  const validatePassword = await bcrypt.compare(password, isExist.rows[0].password);

  if (!validatePassword) {
    throw createError('Password is incorrect', 400);
  }

  // Create token

  const payload = {
    id: isExist.rows[0].id,
    name: isExist.rows[0].username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

  res.status(200).cookie('token', token, {httpOnly: true}).json({
    status: 200,
    token,
  });
};

const logoutUser = (req, res) => {
  res.status(200).clearCookie('token').json({
    status: 200,
    message: 'Logged out successfully',
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
