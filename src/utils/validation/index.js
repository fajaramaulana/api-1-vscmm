const {validationResult} = require('express-validator');
const response = require('../response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({[err.path]: err.msg});
    return null; // Add a return statement here
  });

  return res
      .status(422)
      .json(response.error('Validation error', 422, extractedErrors));
};

const checkEmptyRequestBody = (req) => {
  if (req.headers['content-type'] !== 'application/json') {
    throw new Error('Unsupported Media Type');
  }
  if (Object.keys(req.body).length === 0) {
    throw new Error('Request body cannot be empty');
  }
};

module.exports = {
  validate,
  checkEmptyRequestBody,
};
