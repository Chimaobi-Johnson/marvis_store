const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../model/User');

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


exports.register = (req, res, next) => {
  const { firstName, lastName, gender, email, password } = req.body;

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

