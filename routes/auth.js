const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');
const { validateRegisterForm } = require('../validators/validators');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/register', authController.getRegister);

router.post('/register', validateRegisterForm, authController.register);


module.exports = router;