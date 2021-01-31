// const path = require('path');

const express = require('express');

// const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin', {
        pageTitle: 'Admin',
        path: '/admin'
      });
});

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };

module.exports = router;
