const ProductController = require("../controllers/products-controller");

const express = require("express").Router();
const router = express;

router.get("/", ProductController.getProducts);

module.exports = router;
