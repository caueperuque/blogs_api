const route = require('express').Router();

const { userController } = require('../controllers');
const { validateUser, auth } = require('../middlewares/index');

route.get('/', auth, userController.getAllUsers);
route.post('/', validateUser, userController.signUser);

module.exports = route;