const { categoryService } = require('../services/index');

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) return res.status(400).json({ message: '"name" is required' });
    
    const newCategory = await categoryService.createCategory(name);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: { message: 'teste' } });
  }
};

module.exports = {
  createCategory,
};