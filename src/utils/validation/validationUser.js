const { query, body, param } = require('express-validator');

const getListUserQueryValidationRules = () => {
    return [
        query('take').optional().isInt({ min: 1 }).withMessage('take must be a number'),
        query('skip').optional().isInt({ min: 0 }).withMessage('page must be a number'),
        query('search').optional().isString().withMessage('search must be a string')
    ]
}

const createUserBodyValidationRules = () => {
    return [
        // Validate username
        body('username')
            .isLength({ min: 5 })
            .withMessage('Username must be at least 5 characters')
            .isAlphanumeric()
            .withMessage('Username must consist of letters and numbers'),

        // Validate name
        body('name')
            .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
            .isAlpha().withMessage('Name must consist of letters'),

        // Validate email
        body('email')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(), // Sanitize email address

        // Validate password
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
            .withMessage('Password must contain at least one letter and one number'),
    ]
}

const UpdateUserBodyValidationRules = () => {
    return [
        // Validate name
        body('name')
            .isLength({ min: 2 })
            .withMessage('Name must be at least 2 characters')
            .isAlpha()
            .withMessage('Name must consist of letters'),

        // Validate password (optional)
        body('password')
            .optional()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/)
            .withMessage('Password must contain at least one letter and one number'),

        param('id').notEmpty()
            .withMessage('ID parameter is required')
            .isString()
            .withMessage('ID parameter must be a string'),
    ];
};

const softDeleteUserBodyValidationRules = () => {
    return [
        param('id').notEmpty()
            .withMessage('ID parameter is required')
            .isString()
            .withMessage('ID parameter must be a string'),
    ];
}

module.exports = {
    getListUserQueryValidationRules,
    createUserBodyValidationRules,
    UpdateUserBodyValidationRules,
    softDeleteUserBodyValidationRules
}