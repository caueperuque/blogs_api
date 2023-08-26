const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) return res.status(401).json({ message: 'Token not found' });
    // const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      next();
    }
  } catch (err) {
    return res.status(400).json({ message: 'Expired or invalid token' });
  }
};