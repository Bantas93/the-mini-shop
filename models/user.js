"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  return User;
};
