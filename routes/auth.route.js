//External imports
const express = require("express");
const router = express.Router();

//Internal imports
const authController = require("../controllers/auth.controller");

//Routes
router.route("/login")
    .post(authController.login);
router.route("/register")
    .post(authController.register);

//Exports
module.exports = router;