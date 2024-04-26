module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      senha: DataTypes.STRING,
      tipo: DataTypes.STRING
    });
    return User;
  };