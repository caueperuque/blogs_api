const { userService } = require('../services');

const signUser = async (req, res) => {
  const token = await userService.signUser(req.body);

  if (token.message) return res.status(409).json(token);

  return res.status(201).json({ token });
};

module.exports = {
  signUser,
};