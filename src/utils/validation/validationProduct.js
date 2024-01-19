const { query, body, param } = require('express-validator');

const getListProductQueryValidationRules = () => {
    return [
        query('take').optional().isInt({ min: 1 }).withMessage('take must be a number'),
        query('skip').optional().isInt({ min: 0 }).withMessage('page must be a number'),
        query('search').optional().isString().withMessage('search must be a string')
    ]
}

const createProductBodyValidationRules = () => {
    return [
        body('product_name').exists().withMessage('product_name is required'),
        body('product_price').isInt({ min: 0 }).withMessage('product_price must be a number').exists().withMessage('product_price is required'),
        // Validate product_image
        body('product_image')
            .exists().withMessage('product_image url is required'),
    ];
}

const updateProductBodyValidationRules = () => {
    return [
        body('product_name').exists().withMessage('product_name is required'),
        body('product_price').isInt({ min: 0 }).withMessage('product_price must be a number').exists().withMessage('product_price is required'),
        // Validate product_image
        body('product_image')
            .exists().withMessage('product_image url is required'),
        param('id').notEmpty()
            .withMessage('ID parameter is required')
            .isString()
            .withMessage('ID parameter must be a string'),
    ];
}

const softDeleteProductBodyValidationRules = () => {
    return [
        param('id').notEmpty()
            .withMessage('ID parameter is required')
            .isString()
            .withMessage('ID parameter must be a string'),
    ];
}

module.exports = {
    getListProductQueryValidationRules,
    createProductBodyValidationRules,
    updateProductBodyValidationRules,
    softDeleteProductBodyValidationRules
}