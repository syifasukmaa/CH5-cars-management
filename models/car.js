"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "createdBy",
        },
        as: "creator",
      })
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "updatedBy",
        },
        as: "updater",
      })
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "deletedBy",
        },
        as: "deleter",
      })
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      size: {
        type: DataTypes.ENUM(["small", "medium", "large"]),
        defaultValue: "medium",
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
      image: DataTypes.TEXT,
      imageId: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Car",
    }
  )
  return Car
}
