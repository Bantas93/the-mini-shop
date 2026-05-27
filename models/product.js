"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
            msg: "Stoct must be greater than 0",
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
