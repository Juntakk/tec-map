//External imports
const express = require("express");
const router = express.Router();

//Internal imports
const positionController = require("../controllers/position.controller");

//Routes
router.route("")
    .put(positionController.putPosition);
router.route("/friends")
    .get(positionController.getPositionFriend);

//Exports
module.exports = router;