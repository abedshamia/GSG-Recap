const connection = require('../database/config/connection');
const getAllUsers = async (req, res) => {
  const users = await connection.query('SELECT * FROM users');

  res.status(200).json({
    status: 200,
    users: users.rows,
  });
};

module.exports = {getAllUsers};
