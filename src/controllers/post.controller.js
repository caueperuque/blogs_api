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

const getBlogPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const blogPost = await postService.getBlogPostById(id);

    if (blogPost.message) return res.status(404).json(blogPost);

    return res.status(200).json(blogPost);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

const updatedPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const token = req.headers.authorization;

  try {
    const updatePost = await postService.updatedPost({ title, content, id, token });
    console.log(updatePost);

    if (updatePost.message) return res.status(401).json(updatePost);

    return res.status(200).json(updatePost);
  } catch (err) {
    return res.status(401).json({ messsage: 'Unauthorized user' });
  }
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getBlogPostById,
  updatedPost,
};