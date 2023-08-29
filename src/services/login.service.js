const { generateToken } = require('../utils/index');
const { User } = require('../models');

const getAccess = async (email, password) => {
  const user = await User.findOne({ where: {
    email,
  } });

  const userId = user.id;

  if (!user || user.password !== password) {
    return ({ message: 'Invalid fields' });
  }

  const token = generateToken({ email, userId });
  return token;
};

module.exports = {
  getAccess,
};