"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.hasMany(models.TransactionItem, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product name Required!",
          },
          notNull: {
            msg: "Product name Required!",
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price Required!",
          },
          notNull: {
            msg: "Price Required!",
          },
          min: {
            args: 1,
            msg: "Price must be greater than 0",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock Required!",
          },
          notNull: {
            msg: "Stock Required!",
          },
          min: {
            args: 0,
            msg: "Stock must be greater than 0",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category Required!",
          },
          notNull: {
            msg: "Category Required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
