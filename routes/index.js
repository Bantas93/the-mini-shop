const TransactionController = require("../controllers/transaction-controller");

const express = require("express").Router();
const router = express;

const routeProducts = require("./product-route");
const routeUser = require("./user-route");

router.use("/user", routeUser);

router.use(function (req, res, next) {
  if (!req.session.UserId) {
    const error = "Must be login";
    res.redirect(`/user/login?${error}`);
  } else {
    next();
  }
});

router.use("/", routeProducts);

// buat add produk
router.get("/cart", TransactionController.getCart);
router.post("/cart/add", TransactionController.addToCart);
router.post("/cart/remove/:id", TransactionController.removeItem);
router.post("/checkout", TransactionController.checkout);

router.get("/transaction/history", TransactionController.transactionHistory);

module.exports = router;
