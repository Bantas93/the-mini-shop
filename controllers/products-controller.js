const { Op } = require("sequelize");
const { formatedCurrency } = require("../helpers");
const { Product, Category } = require("../models");

class ProductController {
  static async getProducts(req, res) {
    try {
      const { name, Search } = req.query;
      const includeOptions = {
        model: Category,
        required: false,
      };

      if (name) {
        includeOptions.where = { name };
        includeOptions.required = true;
      }

      let Products = await Product.findAll({
        include: includeOptions,
      });

      if (Search) {
        if (Search) {
          Products = await Product.findAll({
            where: {
              name: {
                [Op.iLike]: `%${Search}%`,
              },
            },
          });
        }
      }

      // res.send(Search);
      res.render("products", { Products, formatedCurrency });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ProductController;
