const express = require('express');

const authController = require('../controllers/auth');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('store/login', {
        pageTitle: 'Marvis Store - Login',
        path: '/store/login'
      });
});


router.get('/register', (req, res) => {
    res.render('store/register', {
        pageTitle: 'Marvis Store - Register',
        path: '/store/register'
      });
});

router.post('/register', authController.register);


module.exports = router;