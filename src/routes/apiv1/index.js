const express = require('express');
const Router = express.Router();

const auth = require('./auth');
const user = require('./user');
const  product = require('./product');

Router
    .use('/auth', auth)
    .use('/user', user)
    .use('/product', product);
module.exports = Router;
