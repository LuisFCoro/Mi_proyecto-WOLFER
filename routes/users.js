const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');


// Register
router.get('/register', usersController.registerForm);
router.post('/register', usersController.register);

// Login
router.get('/login', usersController.loginForm);
router.post('/login', usersController.login);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;
