const {body} = require('express-validator');

const registerValidationRules = () => {
  return [
    // Validate username
    body('username')
        .isLength({min: 5})
        .withMessage('Username must be at least 5 characters')
        .isAlphanumeric()
        .withMessage('Username must consist of letters and numbers'),

    // Validate name
    body('name')
        .isLength({min: 2}).withMessage('Name must be at least 2 characters')
        .isAlpha().withMessage('Name must consist of letters'),

    // Validate email
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(), // Sanitize email address

    // Validate password
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('Password must contain at least one letter and one number'),
  ];
};

const loginValidationRules = () => {
  return [
    // Validate email
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(), // Sanitize email address

    // Validate password
    body('password')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('Password must contain at least one letter and one number'),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
