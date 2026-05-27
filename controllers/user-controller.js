const {
  User,
  Profile,
  Category,
  Product,
  Transaction,
  TransactionItem,
} = require("../models");

class UserController {
  static async formLogin(req, res) {
    try {
      res.render("formLogin");
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      res.send(req.body);
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
      const { username, email, password, role } = req.body;
      await User.create({
        username,
        password,
        role,
        email,
      });
      // res.send(req.body);
      res.redirect("/user/login");
    } catch (error) {
      res.send(error);
    }
  }

  static async getProfile(req, res) {
    try {
      const { userId } = req.params;
      const Profiled = await Profile.findByPk(userId, {
        include: User,
      });
      res.send(Profiled);
      // res.render("profile", { Profiled });
    } catch (error) {
      res.send(error);
    }
  }

  static async formEditProfile(req, res) {
    try {
      const { userId } = req.params;
      const Profiled = await Profile.findByPk(userId, {
        include: User,
      });
      // res.send(Profiled);
      res.render("editProfile", { Profiled });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditProfile(req, res) {
    try {
      const { userId } = req.params;
      const Profiled = await Profile.update({
        where: {
          UserId,
        },
      });
      res.redirect("/user");
      // res.render("profile", { Profiled });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;
