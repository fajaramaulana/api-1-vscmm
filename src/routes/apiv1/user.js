const express = require('express');
const {validate} = require('../../utils/validation');
const { getListUserController, createUserController, updateUserController, softDeleteUserController } = require('../../controllers/userController');
const { getListUserQueryValidationRules, createUserBodyValidationRules, UpdateUserBodyValidationRules, softDeleteUserBodyValidationRules } = require('../../utils/validation/validationUser');
const { authenticateJWT } = require('../../middleware/jwtMiddleware');

const Router = express.Router();

Router
    .get('/', authenticateJWT, getListUserQueryValidationRules(), validate, getListUserController)
    .post('/', authenticateJWT, createUserBodyValidationRules(), validate, createUserController)
    .put('/:id', authenticateJWT, UpdateUserBodyValidationRules(), validate, updateUserController)
    .delete('/:id', authenticateJWT, softDeleteUserBodyValidationRules(), validate, softDeleteUserController)
module.exports = Router;
