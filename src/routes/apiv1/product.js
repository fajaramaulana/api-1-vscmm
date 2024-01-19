const express = require('express');
const {validate} = require('../../utils/validation');
const { createUserBodyValidationRules, UpdateUserBodyValidationRules, softDeleteUserBodyValidationRules } = require('../../utils/validation/validationUser');
const { authenticateJWT } = require('../../middleware/jwtMiddleware');
const { getListProductController, createProductController, updateProductController, softDeleteProductController } = require('../../controllers/productController');
const { getListProductQueryValidationRules, createProductBodyValidationRules, updateProductBodyValidationRules, softDeleteProductBodyValidationRules } = require('../../utils/validation/validationProduct');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const Router = express.Router();

Router
    .get('/', authenticateJWT, getListProductQueryValidationRules(), validate, getListProductController)
    .post('/', authenticateJWT, upload.single('image'), createProductBodyValidationRules(), validate, createProductController)
    .put('/:id', authenticateJWT, upload.single('image'), updateProductBodyValidationRules(), validate, updateProductController)
    .delete('/:id', authenticateJWT, upload.single('image'), softDeleteProductBodyValidationRules(), validate, softDeleteProductController)
module.exports = Router;
