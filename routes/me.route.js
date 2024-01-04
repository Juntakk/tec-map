//External imports
const express = require("express");
const router = express.Router();

//Internal imports
const meController = require("../controllers/me.controller");

router.route("")
    .get(meController.getMe)
    .put(meController.putMe)
    .delete(meController.deleteMe);

//Exports
module.exports = router;