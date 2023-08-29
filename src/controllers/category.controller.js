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

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(404).json({ message: '"id" not found' });

    const category = await categoryService.getCategoryById(id);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};