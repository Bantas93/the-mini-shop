const { where } = require("sequelize");
const {
  User,
  Profile,
  Category,
  Product,
  Transaction,
  TransactionItem,
} = require("../models");
const bcrypt = require("bcryptjs");
class UserController {
  static async formLogin(req, res) {
    try {
      const { error } = req.query;
      res.render("formLogin", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const { dataValues } = user;
      const profile = await Profile.findOne({
        where: {
          UserId: dataValues.id,
        },
      });

      if (user) {
        const UserPassword = user.password;
        const isValidPassword = bcrypt.compareSync(password, UserPassword);

        if (isValidPassword) {
          req.session.UserId = dataValues.id;
          req.session.name = dataValues.username;
          req.session.email = dataValues.email;
          req.session.role = dataValues.role;
          req.session.address = profile.dataValues.address;
          req.session.phoneNumber = profile.dataValues.phoneNumber;
          return res.redirect("/");
        } else {
          const error = "Invalid password";
          return res.redirect(`/user/login?error=${error}`);
        }
      } else {
        const error = "Invalid email";
        return res.redirect(`/user/login?error=${error}`);
      }

      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static async formRegister(req, res) {
    try {
      res.render("formRegister");
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      const { username, email, password, role, address, phoneNumber } =
        req.body;

      const user = await User.create({
        username,
        password,
        role,
        email,
      });

      await Profile.create({
        address,
        phoneNumber,
        UserId: user.id,
      });

      res.redirect("/user/login");
    } catch (error) {
      res.send(error);
    }
  }

  static async getProfile(req, res) {
    try {
      const { userId } = req.params;
      const Profiled = await User.findByPk(userId, {
        include: Profile,
      });
      res.render("profile", { Profiled });
    } catch (error) {
      res.send(error);
    }
  }

  static async formEditProfile(req, res) {
    try {
      const { userId } = req.params;
      const Profiled = await Profile.findOne({
        where: {
          UserId: userId,
        },
        include: User,
      });
      // res.send(Profiled);
      res.render("formEditProfile", { Profiled });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditProfile(req, res) {
    try {
      const { username, email, address, phoneNumber, role } = req.body;
      const { userId } = req.params;
      await User.update(
        {
          username,
          email,
          role,
        },
        {
          where: { id: userId },
        },
      );
      await Profile.update(
        {
          address,
          phoneNumber,
        },
        {
          where: { UserId: userId },
        },
      );
      res.redirect(`/user/${userId}`);
    } catch (error) {
      res.send(error);
    }
  }

  static logout(req, res) {
    req.session.destroy((errpr) => {
      if (error) {
        return res.send(error);
      }
      res.redirect("/user/login");
    });
  }
}

module.exports = UserController;
