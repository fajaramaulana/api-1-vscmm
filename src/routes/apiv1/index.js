const express = require('express');
const Router = express.Router();

const auth = require('./auth');
const user = require('./user');

Router
    .use('/auth', auth)
    .use('/user', user);
module.exports = Router;
