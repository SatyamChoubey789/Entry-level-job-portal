const Router = require('express');
const router = Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth.controller');

// common routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(logoutUser);

module.exports = router;
