"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    static associate(models) {
      TransactionItem.belongsTo(models.Transaction, {
        foreignKey: "TransactionId",
      });
      TransactionItem.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  TransactionItem.init(
    {
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Quantity Required!",
          },
          notNull: {
            msg: "Quantity Required!",
          },
        },
      },
      TransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction Required!",
          },
          notNull: {
            msg: "Transaction Required!",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Product Required!",
          },
          notNull: {
            msg: "Product Required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionItem",
    },
  );
  return TransactionItem;
};
