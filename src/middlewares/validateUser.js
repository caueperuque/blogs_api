const validateUser = (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    if (displayName.length < 8) {
      return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
    }

    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

    if (!regex.test(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }

    if (password.length < 6) {
      return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

module.exports = {
  validateUser,
};