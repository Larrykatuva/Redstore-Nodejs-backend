const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const UserController = require('../controllers/Auth.Controller');

router.post('/signup', UserController.createNewUser);
router.get('/activate/:id/:token', UserController.activateUser);
router.post('/login', UserController.loginUser);
router.post('/reset-password', UserController.resetPasswordLink);
router.post('/new-password/:id/:token', UserController.setNewPassword);

//Exporting the routes
module.exports = router;