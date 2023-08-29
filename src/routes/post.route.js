const route = require('express').Router();
const { postController } = require('../controllers');
const { auth, validatePost } = require('../middlewares');
const validateCategory = require('../middlewares/validateCategory');

route.post('/', auth, validatePost, validateCategory, postController.createPost);

module.exports = route;