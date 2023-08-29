const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (token) => {
  const bearer = token.split(' ')[1];
  const decode = jwt.verify(bearer, JWT_SECRET);
  console.log(decode);

  return decode;
};
