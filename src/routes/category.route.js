const route = require('express').Router();
const { categoryController } = require('../controllers');
const { auth } = require('../middlewares');

route.post('/', auth, categoryController.createCategory);

module.exports = route;