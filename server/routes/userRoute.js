const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
const {
    signup,
    login,
    logout,
    checkAuth
} = require('../controllers/usersController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/check-auth', requireAuth, checkAuth);


module.exports = router;