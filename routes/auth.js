const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('store/login', {
        pageTitle: 'Marvis Store - Login',
        path: '/store/login'
      });
});

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/register', authController.getRegister);

router.post('/register', check('email').isEmail(), authController.register);


module.exports = router;