const { userService } = require('../services');

const signUser = async (req, res) => {
  const token = await userService.signUser(req.body);

  if (token.message) return res.status(409).json(token);

  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUser();

  res.status(200).json(users);
};

module.exports = {
  signUser,
  getAllUsers,
};