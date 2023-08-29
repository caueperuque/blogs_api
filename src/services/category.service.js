const { Category } = require('../models');

const createCategory = async (name) => {
  await Category.create({ name });

  const newCategory = await Category.findOne({
    where: { name },
  });

  if (!newCategory) return ({ newCategory });

  return newCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({
    where: { id },
  });

  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};