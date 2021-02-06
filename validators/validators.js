const User = require('../model/User');
const { check, body } = require('express-validator/check');

const validateRegisterForm = [
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, {req}) => {

        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject(
                    'E-Mail exists already, please pick a different one.'
                );
            }
        });

    })
    .normalizeEmail(),
    body(
        'firstName',
        'First name is too short'
      )
    .isLength({ min: 3 }),
    body(
        'lastName',
        'Last name is too short'
      )
    .isLength({ min: 3 }),
    body(
        'gender',
        'Please select your gender'
    )
    .isLength({ min: 3 }),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.'
      )
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
        }
        return true;
    })
]


module.exports = {
    validateRegisterForm
}