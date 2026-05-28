const UserController = require("../controllers/user-controller");

const express = require("express").Router();
const router = express;

router.get("/login", UserController.formLogin);

router.post("/login", UserController.postLogin);

router.get("/register", UserController.formRegister);

router.post("/register", UserController.postRegister);

router.get("/:userId", UserController.getProfile);

router.get("/:userId/edit", UserController.formEditProfile);

router.post("/:userId/edit", UserController.postEditProfile);

router.get("/logout", UserController.logout)

module.exports = router;
