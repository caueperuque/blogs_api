const route = require('express').Router();
const { categoryController } = require('../controllers');
const { auth } = require('../middlewares');

route.get('/', auth, categoryController.getAllCategories);
route.get('/:id', categoryController.getCategoryById);
route.post('/', auth, categoryController.createCategory);

module.exports = route;