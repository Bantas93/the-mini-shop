"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: "CategoryId" });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category name Required!",
          },
          notNull: {
            msg: "Category name Required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    },
  );
  return Category;
};
