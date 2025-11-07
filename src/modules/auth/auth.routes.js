const express = require('express');
const router = express.Router();
const authController = require('./auth.controllers');
const auth = require('../../middleware/auth');

// public
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// protected whoami route
router.get('/me', auth, authController.me);

module.exports = router;
