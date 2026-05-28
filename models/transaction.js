"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
      Transaction.hasMany(models.TransactionItem, {
        foreignKey: "TransactionId",
      });
    }
    static async getCartByUser(userId, models) {
      return await Transaction.findOne({
        where: {
          userId: userId,
        },
        include: {
          model: models.TransactionItem,
          include: models.Product,
        },
        order: [["createdAt", "DESC"]],
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
            args: [0],
            msg: "Total Price must be greater than 0",
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date Transaction Required!",
          },
          notNull: {
            msg: "Date Transaction Required!",
          },
        },
        defaultValue: "cart",
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
