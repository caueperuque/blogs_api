module.exports = (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: 'Oops something went wrong' });
  }
};