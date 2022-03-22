const {getAllUsers} = require('../controllers');
const {verifyToken} = require('../middlewares/verifyToken');
const router = require('express').Router();

router.get('/users', verifyToken, getAllUsers);

module.exports = router;
