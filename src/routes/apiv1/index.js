const express = require('express');
const Router = express.Router();

const auth = require('./auth');

Router
    .use('/auth', auth)
module.exports = Router;
