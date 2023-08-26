const route = require('express').Router();

const { userController } = require('../controllers');
const { validateUser } = require('../middlewares/index');

route.get('/', userController.getAllUsers);
route.post('/', validateUser, userController.signUser);

module.exports = route;