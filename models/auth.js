'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auth.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      });
    }
  }
  Auth.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      confirmPassword: { type: DataTypes.STRING, allowNull: false },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Auth',
    }
  );
  return Auth;
};
