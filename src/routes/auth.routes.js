const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const UserController = require('../controllers/Auth.Controller');

router.post('/signup', UserController.createNewUser);
router.get('/activate/:id/:token', UserController.activateUser);

//Exporting the routes
module.exports = router;