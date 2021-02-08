const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { validationResult } = require('express-validator/check');

exports.getDashboard = (req, res) => {
    res.render('admin', {
        pageTitle: 'Admin',
        path: '/admin',
        user: req.user
      });
}

exports.getUsers = (req, res) => {
    User.find().then(users => {
        res.render('admin/users', {
            pageTitle: 'All Users',
            path: '/admin/users',
            users: users
          });
    }).catch(err => {
        res.status(500).render('admin/users', {
            pageTitle: 'All Users',
            path: '/admin/users',
            users: null
          });
    })

}

exports.getAddUser = (req, res) => {
    let flashMsg = req.flash('regAdminSuccess');
    if (flashMsg.length > 0) {
        flashMsg = flashMsg[0];
      } else {
        flashMsg = null;
      }
    res.render('admin/addUser', {
        pageTitle: 'Add Users',
        path: '/admin/user/add',
        flashMessage: flashMsg,
        errorMessage: null,
        oldInput: {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            address: '', country: '', role: '', image: '',
            confirmPassword: ''
          }
    });
}


exports.getEditUser = (req, res) => {
    let flashMsg = req.flash('userUpdateSuccess');
    if (flashMsg.length > 0) {
        flashMsg = flashMsg[0];
      } else {
        flashMsg = null;
      }
    User.findById(req.params.id).then(user => {
        if(!user) {
            res.render('admin/editUser', {
                pageTitle: 'Edit Users',
                path: '/admin/user/edit/:id',
                flashMessage: flashMsg,
                errorMessage: 'User not found',
                oldInput: {
                    firstName: '',
                    lastName: '',
                    gender: '',
                    email: '',
                    password: '',
                    address: '', country: '', role: '', image: '',
                    confirmPassword: ''
                  }
            });
        }
        res.render('admin/editUser', {
            pageTitle: 'Edit Users',
            path: '/admin/user/edit/:id',
            flashMessage: flashMsg,
            errorMessage: null,
            oldInput: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                email: user.email,
                password: user.password,
                address: user.address, country: user.country, role: user.role, image: user.image,
                confirmPassword: user.confirmPassword
            }
        });
    })

    
}

exports.getProducts = (req, res) => {
    res.render('admin/products', {
        pageTitle: 'All Products',
        path: '/admin/products',
        user: req.user
      });
}

exports.getAccounts = (req, res) => {
    res.render('admin/accounts', {
        pageTitle: 'Accounts',
        path: '/admin/accounts',
        user: req.user
      });
}

exports.getPosts = (req, res) => {
    res.render('admin/posts', {
        pageTitle: 'All Posts',
        path: '/admin/posts',
        user: req.user
      });
}

exports.getComments = (req, res) => {
    res.render('admin/comments', {
        pageTitle: 'All Comments',
        path: '/admin/comments',
        user: req.user
      });
}   


exports.addUser = (req, res) => {
  const { firstName, lastName, gender, email, address, country, role, image, password } = req.body;
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/addUser', {
      path: '/admin/user/add',
      pageTitle: 'Add User',
      flashMessage: null,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        firstName,
        lastName,
        gender,
        email,
        password,
        address, country, role, image,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        firstName,
        lastName,
        gender,
        email,
        address, country, role, image,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      req.flash('regAdminSuccess', 'User registered successfully')
      res.redirect('/admin/user/add');
    })
    .catch(err => {
      console.log(err)
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.updateUser = (req, res) => {
    const { firstName, lastName, gender, email, address, country, role, image, password } = req.body;
    console.log(req.params)
    User.updateOne({_id: req.params.id }, { ...req.body })
    .then(user => {
        console.log(user)
        res.render('admin/editUser', {
            pageTitle: 'Update Users',
            path: '/admin/user/edit/:id',
            flashMessage: flashMsg,
            errorMessage: null,
            oldInput: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                email: user.email,
                password: user.password,
                address: user.address, country: user.country, role: user.role, image: user.image,
                confirmPassword: user.confirmPassword
            }
        });
    }).catch(err => {
        console.log(err);
    })
}