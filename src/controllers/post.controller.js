const { postService } = require('../services/index');
const decodedToken = require('../utils/decodedToken');

const createPost = async (req, res) => {
  const { body } = req;
  const code = req.headers.authorization;
  const { userId } = decodedToken(code).payload;

  const post = {
    ...body,
    userId,
  };

  try {
    const result = await postService.createPost(post);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json(post.message);
  }
};

module.exports = {
  createPost,
};