const route = require('express').Router();
const { categoryController } = require('../controllers');
const { auth } = require('../middlewares');

route.post('/', auth, categoryController.createCategory);
route.get('/', auth, categoryController.getAllCategories);
route.get('/:id', categoryController.getCategoryById);

module.exports = route;