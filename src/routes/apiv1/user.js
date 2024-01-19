const express = require('express');
const {validate} = require('../../utils/validation');
const { getListUserController, createUserController } = require('../../controllers/userController');
const { getListUserQueryValidationRules, createUserBodyValidationRules } = require('../../utils/validation/validationUser');
const { authenticateJWT } = require('../../middleware/jwtMiddleware');

const Router = express.Router();

Router
    .get('/', authenticateJWT, getListUserQueryValidationRules(), validate, getListUserController)
    .post('/', authenticateJWT, createUserBodyValidationRules(), validate, createUserController)
module.exports = Router;
