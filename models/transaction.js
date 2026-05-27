"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
      Transaction.hasMany(models.TransactionItem, {
        foreignKey: "TransactionId",
      });
    }
  }
  Transaction.init(
    {
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category name Required!",
          },
          notNull: {
            msg: "Category name Required!",
          },
          min: {
            args: 1,
            msg: "Total Price must be greater than 1",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date Transaction Required!",
          },
          notNull: {
            msg: "Date Transaction Required!",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User Required!",
          },
          notNull: {
            msg: "User Required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
