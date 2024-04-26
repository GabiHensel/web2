module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
      titulo: DataTypes.STRING,
      resumo: DataTypes.STRING,
      link: DataTypes.STRING,
      status: DataTypes.STRING,
      nota: DataTypes.FLOAT
    });
  
    Article.associate = (models) => {
      Article.belongsToMany(models.User, { through: 'UserArticle', as: 'authors', foreignKey: 'articleId' });
      Article.belongsToMany(models.User, { through: 'Review', as: 'reviewers', foreignKey: 'articleId' });
    };
  
    return Article;
  };