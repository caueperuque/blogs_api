const { categoryService } = require('../services');

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  try {
    if (!categoryIds) return res.status(400).json({ message: 'Some required fields are missing' });
    
    const categoryExist = categoryIds.map(async (id) => {
      const category = await categoryService.getCategoryById(id);
      
      if (!category) {
        return null;
      }
      
      return category;
    });
    const categories = await Promise.all(categoryExist);

    if (categories.includes(null)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' }); 
    }

    return next();
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
