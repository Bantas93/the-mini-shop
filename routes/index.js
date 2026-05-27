const TransactionController = require("../controllers/transaction-controller");

const express = require("express").Router();
const router = express;

const routeProducts = require("./product-route");
const routeUser = require("./user-route");

router.use("/", routeProducts);
router.use("/user", routeUser);

// buat add produk
router.get("/cart", TransactionController.getCart);
router.post("/cart/add", TransactionController.addToCart);
router.post("/cart/remove/:id", TransactionController.removeItem);
router.post("/checkout", TransactionController.checkout);

module.exports = router;
