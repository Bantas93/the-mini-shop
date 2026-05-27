const { Transaction, TransactionItem, Product } = require("../models");

class TransactionController {
  static async getCart(req, res) {
    try {
      res.render("cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async addToCart(req, res) {
    try {
      const { ProductId } = req.body;
      res.send(ProductId);
      // res.redirect("/cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async removeItem(req, res) {
    try {
      res.redirect("/cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async checkout(req, res) {
    try {
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = TransactionController;
