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

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (user.message) return res.status(404).json(user);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

module.exports = {
  signUser,
  getAllUsers,
  getUserById,
};