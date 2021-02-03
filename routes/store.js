const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('store', {
        pageTitle: 'Marvis Store',
        path: '/store'
      });
});


router.get('/dashboard', (req, res) => {
    res.render('store/dashboard', {
        pageTitle: 'Marvis Store - Dashboard',
        path: '/store/dashboard'
      });
});


module.exports = router;
