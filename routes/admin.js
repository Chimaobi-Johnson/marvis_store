// const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const { validateRegisterForm } = require('../validators/validators');

const router = express.Router();

router.get('/', adminController.getDashboard);

router.get('/users', adminController.getUsers);

router.get('/user/add', adminController.getAddUser);

router.get('/user/edit/:id', adminController.getEditUser);

router.get('/products', adminController.getProducts);

router.get('/accounts', adminController.getAccounts);

router.get('/posts', adminController.getPosts);

router.get('/comments', adminController.getComments);


router.post('/user/add', validateRegisterForm, adminController.addUser);

router.post('/user/update', validateRegisterForm, adminController.updateUser);


module.exports = router;
