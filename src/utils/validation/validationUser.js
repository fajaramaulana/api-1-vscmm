const {query} = require('express-validator');

const getListUserQueryValidationRules = () => {
    return [
        query('take').optional().isInt({ min: 1 }).withMessage('take must be a number'),
        query('skip').optional().isInt({ min: 0 }).withMessage('page must be a number'),
        query('search').optional().isString().withMessage('search must be a string')
    ]
}

module.exports = {
    getListUserQueryValidationRules
}