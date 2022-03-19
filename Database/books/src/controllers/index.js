const connection = require('../database/config/connection');

const getAllUsers = async (req, res) => {
  const users = await connection.query('SELECT * FROM users');
  res.send(users.rows);
};

const addUser = async (req, res) => {
  const {name, email} = req.body;

  const user = await connection.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );

  res.send(user.rows);
};

module.exports = {getAllUsers, addUser};
