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

const getAllBlogPosts = async (req, res) => {
  const blogPosts = await postService.getAllBlogPosts();

  return res.status(200).json(blogPosts);
};

module.exports = {
  createPost,
  getAllBlogPosts,
};