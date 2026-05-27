"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Profile.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address Required!",
          },
          notNull: {
            msg: "Address Required!",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number Required!",
          },
          notNull: {
            msg: "Phone Number Required!",
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
      modelName: "Profile",
    },
  );
  return Profile;
};
