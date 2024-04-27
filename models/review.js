module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    nota1: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        min: 0,
        max: 10,
      },
    },
    nota2: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        min: 0,
        max: 10,
      },
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { as: 'reviewer', foreignKey: 'userId' });
    Review.belongsTo(models.Article, { as: 'article', foreignKey: 'articleId' });
  };

  return Review;
};
