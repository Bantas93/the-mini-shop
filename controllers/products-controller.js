const { formatedCurrency } = require("../helpers");
const { Product } = require("../models");

class ProductController {
  static async getProducts(req, res) {
    try {
      const Products = await Product.findAll();
      res.render("products", { Products, formatedCurrency });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ProductController;
