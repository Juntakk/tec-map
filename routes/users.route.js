//External imports
const express = require("express");
const router = express.Router();

//Internal imports
const userController = require("../controllers/users.controller");

//Routes
router.route("")
    .get(userController.getAllUsers);

//Exports
module.exports = router;