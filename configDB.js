const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const ArticleModel = require('./models/article');
const ReviewModel = require('./models/review');

const sequelize = new Sequelize('web2', 'postgres', 'gabi123', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = UserModel(sequelize, Sequelize);
const Article = ArticleModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);

User.belongsToMany(Article, { through: 'UserArticle', as: 'articles', foreignKey: 'userId' });
Article.belongsToMany(User, { through: 'UserArticle', as: 'authors', foreignKey: 'articleId' });

User.belongsToMany(Article, { through: Review, as: 'reviews', foreignKey: 'userId' });
Article.belongsToMany(User, { through: Review, as: 'reviewers', foreignKey: 'articleId' });

module.exports = { sequelize, User, Article, Review };
