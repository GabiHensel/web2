module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      nota1: DataTypes.FLOAT,
      nota2: DataTypes.FLOAT
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.User, { as: 'reviewer', foreignKey: 'userId' });
      Review.belongsTo(models.Article, { as: 'article', foreignKey: 'articleId' });
    };
  
    return Review;
  };