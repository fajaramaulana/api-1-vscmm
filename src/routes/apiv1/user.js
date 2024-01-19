const express = require('express');
const {validate} = require('../../utils/validation');
const { getListUserController } = require('../../controllers/userController');
const { getListUserQueryValidationRules } = require('../../utils/validation/validationUser');
const { authenticateJWT } = require('../../middleware/jwtMiddleware');

const Router = express.Router();

Router
    .get('/', authenticateJWT, getListUserQueryValidationRules(), validate, getListUserController)
module.exports = Router;
