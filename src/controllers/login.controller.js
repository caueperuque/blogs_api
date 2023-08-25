const { loginService } = require('../services/index');

const getAccess = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginService.getAccess(email, password);

  if (token.message) return res.status(400).json(token);
  
  res.status(200).json({ token });
};

module.exports = {
  getAccess, 
};