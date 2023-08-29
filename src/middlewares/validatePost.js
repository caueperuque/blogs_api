// const { categoryService } = require('../services');

module.exports = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};