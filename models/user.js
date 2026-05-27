"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "UserId" });
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username Required!",
          },
          notNull: {
            msg: "Username Required!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password Required!",
          },
          notNull: {
            msg: "Password Required!",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role Required!",
          },
          notNull: {
            msg: "Role Required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, 8);
  });
  return User;
};
