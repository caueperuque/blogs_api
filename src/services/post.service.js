const { sequelize, PostCategory, BlogPost, User, Category } = require('../models');

const createPost = async ({ title, content, userId, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({
        title,
        content,
        userId,
        published: Date.now(),
        updated: Date.now(),
      }, { transaction: t });

      const category = categoryIds.map(async (id) => (
        PostCategory.create(
          { postId: post.id, categoryId: id },
          { transaction: t },
        )
      ));
      await Promise.all(category);
      return post;
  });

  return result;
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { 
        model: Category, 
        as: 'categories', 
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] }, // Exclui a tabela de junção PostCategory
      },
    ],
  });

  return blogPosts;
};

module.exports = {
  createPost,
  getAllBlogPosts,
};