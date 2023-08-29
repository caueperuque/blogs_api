const { generateToken } = require('../utils/index');
const { User } = require('../models');

const getAccess = async (email, password) => {
  const user = await User.findOne({ where: {
    email,
  } });

  if (!user || user.password !== password) {
    return ({ message: 'Invalid fields' });
  }
  
  if (user) {
    const userId = user.id;
    return generateToken({ email, userId });
  }

  const token = generateToken({ email });
  return token;
};

module.exports = {
  getAccess,
};