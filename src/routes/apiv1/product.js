const express = require('express');
const {validate} = require('../../utils/validation');
const { createUserBodyValidationRules, UpdateUserBodyValidationRules, softDeleteUserBodyValidationRules } = require('../../utils/validation/validationUser');
const { authenticateJWT } = require('../../middleware/jwtMiddleware');
const { getListProductController } = require('../../controllers/productController');
const { getListProductQueryValidationRules } = require('../../utils/validation/validationProduct');

const Router = express.Router();

Router
    .get('/', authenticateJWT, getListProductQueryValidationRules(), validate, getListProductController)
    // .post('/', authenticateJWT, createUserBodyValidationRules(), validate, createUserController)
    // .put('/:id', authenticateJWT, UpdateUserBodyValidationRules(), validate, updateUserController)
    // .delete('/:id', authenticateJWT, softDeleteUserBodyValidationRules(), validate, softDeleteUserController)
module.exports = Router;
