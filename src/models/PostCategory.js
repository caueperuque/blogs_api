module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'blog_posts',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, { through: PostCategory, foreignKey: 'postId', otherKey: 'categoryId', as: 'categories' });

    models.Category.belongsToMany(models.BlogPost, { through: PostCategory, foreignKey: 'categoryId', otherKey: 'postId', as: 'blogs_post' })
  }

  return PostCategory;
};
