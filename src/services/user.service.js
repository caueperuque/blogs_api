const { generateToken } = require('../utils/index');
const { User } = require('../models');

const signUser = async ({ displayName, email, image, password }) => {
  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) return ({ message: 'User already registered' });

  await User.create({ displayName, email, password, image });

  const token = generateToken({ email });
  return token;
};

const getAllUser = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

module.exports = {
  signUser,
  getAllUser,
};