const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { validationResult } = require('express-validator/check');

exports.login = (req, res, next) => {
const { email, password } = req.body;

User.findOne({ email: email })
.then(user => {
    if (!user) {
        console.log('user not found');
    }
    bcrypt.compare(password, user.password)
    .then(doMatch => {
        if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
            console.log(err);
            res.redirect('/');
            });
        }
        return res.status(422).render('/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
            oldInput: {
            email: email,
            password: password
            },
            validationErrors: []
        });
    })
    .catch(err => {
    console.log(err);
    res.redirect('/login');
    });
})
.catch(err => {
const error = new Error(err);
error.httpStatusCode = 500;
return next(error);
});

}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}


exports.getRegister = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('store/register', {
    path: '/register',
    pageTitle: 'Register',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
}

exports.register = (req, res, next) => {
  const { firstName, lastName, gender, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('/register', {
      path: '/register',
      pageTitle: 'Register',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        firstName,
        lastName,
        gender,
        email,
        password,
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
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err)
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

