const { Category } = require('../models');

const createCategory = async (name) => {
  await Category.create({ name });

  const newCategory = await Category.findOne({
    where: { name },
  });

  if (!newCategory) return ({ newCategory });

  return newCategory;
};

module.exports = {
  createCategory,
};