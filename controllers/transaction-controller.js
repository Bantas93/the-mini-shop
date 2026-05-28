const easyinvoice = require("easyinvoice");
const fs = require("fs");
const { Transaction, TransactionItem, Product } = require("../models");
const { where } = require("sequelize");
const { log } = require("console");

class TransactionController {
  static async getCart(req, res) {
    try {
      const transaction = await Transaction.findOne({
        where: {
          UserId: req.session.UserId,
          status: "cart"
        },
        include: {
          model: TransactionItem,
          include: Product,
        },
      });
      res.render("cart", { transaction });
    } catch (error) {
      res.send(error);
    }
  }

  static async addToCart(req, res) {
    try {
      const { ProductId } = req.body;
      let transaction = await Transaction.findOne({
        where: {
          UserId: req.session.UserId,
          status: "cart"
        },
      });

      if (!transaction) {
        transaction = await Transaction.create({
          totalPrice: 0,
          date: new Date(),
          UserId: req.session.UserId,
          status: "cart"
        });
      }

      const product = await Product.findByPk(ProductId);

      let item = await TransactionItem.findOne({
        where: {
          TransactionId: transaction.id,
          ProductId,
        },
      });

      if (item) {
        await item.update({
          qty: item.qty + 1,
        });
      } else {
        await TransactionItem.create({
          qty: 1,
          TransactionId: transaction.id,
          ProductId,
        });
      }

      const items = await TransactionItem.findAll({
        where: {
          TransactionId: transaction.id,
        },
        include: Product,
      });

      let total = 0;

      items.forEach((el) => {
        total += Number(el.Product.price) * el.qty;
      });

      await transaction.update({
        totalPrice: total,
      });

      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static async removeItem(req, res) {
    try {
      const { id } = req.params;

      const item = await TransactionItem.findByPk(id, {
        include: Product,
      });

      if (!item) {
        return res.redirect("/cart");
      }

      const transaction = await Transaction.findByPk(item.TransactionId);
      await item.destroy();

      const remaining = await TransactionItem.findAll({
        where: {
          TransactionId: transaction.id,
        },
        include: Product,
      });

      let total = 0;
      remaining.forEach((el) => {
        total += Number(el.Product.price) * el.qty;
      });

      await transaction.update({ totalPrice: total });

      res.redirect("/cart");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async checkout(req, res) {
    try {
      const transaction = await Transaction.findOne({
        where: {
          UserId: req.session.UserId,
        },
        include: {
          model: TransactionItem,
          include: Product,
        },
      });

      if (!transaction) {
        return res.send("Cart Empty");
      }

      let products = [];

      transaction.TransactionItems.forEach((el) => {
        products.push({
          quantity: el.qty,
          description: el.Product.name,
          price: Number(el.Product.price),
        });
      });

      const data = {
        sender: {
          company: "Mini Shop",
        },
        client: {
          company: req.session.name,
        },
        information: {
          number: `${transaction.id}`,
          date: new Date().toLocaleDateString("id-ID"),
        },
        products,

        settings: {
          currency: "IDR",
          "margin-top": 50,
          "margin-right": 50,
          "margin-left": 50,
          "margin-bottom": 25,
        },

        bottomNotice: "Thank you for shopping! Hope to see you again soon",
      };
      const result = await easyinvoice.createInvoice(data);
      fs.writeFileSync("invoice.pdf", result.pdf, "base64");

      for (let i = 0; i < transaction.TransactionItems.length; i++) {
        let item = transaction.TransactionItems[i];
        let product = await Product.findByPk(item.ProductId);

        if (product.stock < item.qty) {
          return res.send(`Stok produk "${product.name}" tidak mencukupi.`);
        }
      }

      for (let i = 0; i < transaction.TransactionItems.length; i++) {
        let item = transaction.TransactionItems[i];
        let product = await Product.findByPk(item.ProductId);
        await product.update({ stock: product.stock - item.qty });
      }

      await TransactionItem.destroy({
        where: {
          TransactionId: transaction.id,
        },
      });

      await transaction.update({
        status: "checkout"
      })

      await Transaction.create({
        totalPrice: 0,
        status: "cart",
        date: new Date(),
        UserId: req.session.UserId
      })

      return res.download("invoice.pdf");
    } catch (error) {
      res.send(error);
    }
  }

  static async transactionHistory(req, res) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          UserId: req.session.UserId,
          status: "checkout"
        },
        include: [
          {
          model: TransactionItem,
          include: [
            {
              model: Product
            }
          ]
          }
        ],
        order: [
          ["createdAt", "DESC"]
        ]
      })
      res.send(transactions)
      // res.render("history", { transactions });

    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = TransactionController;
