const Router = require('express');
const router = Router();

// import routes
const { getProfile, updateProfile } = require('../controllers/user.controller');

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;