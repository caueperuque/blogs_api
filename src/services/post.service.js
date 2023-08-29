const { sequelize, PostCategory, BlogPost, User, Category } = require('../models');
const decodedToken = require('../utils/decodedToken');

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

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
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

  if (!blogPost) return ({ message: 'Post does not exist' });

  return blogPost;
};

const updatedPost = async ({ title, content, id, token }) => {
  const updatePost = await BlogPost.findOne({ where: { id } });

  if (decodedToken(token).payload.userId === updatePost.userId) {
    await BlogPost.update({ title, content, updated: Date.now() }, {
      where: { id },
    });
    return BlogPost.findOne({
      where: { id },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { 
          model: Category, 
          as: 'categories', 
          attributes: { exclude: ['PostCategory'] },
          through: { attributes: [] }, // Exclui a tabela de junção PostCategory
        },
      ],
    });
  }

  return ({ message: 'Unauthorized user' });
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getBlogPostById,
  updatedPost,
};