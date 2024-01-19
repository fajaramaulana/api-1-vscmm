const express = require('express');
const {registerController, loginController} = require('../../controllers/authController');
const {registerValidationRules, loginValidationRules} = require('../../utils/validation/validationAuth');
const {validate} = require('../../utils/validation');

const Router = express.Router();

Router
    .post('/register', registerValidationRules(), validate, registerController)
    .post('/login', loginValidationRules(), validate, loginController);

module.exports = Router;
