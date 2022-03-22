const {registerUser, loginUser, logoutUser} = require('./authController');
const {getAllUsers} = require('./userController');

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
};
