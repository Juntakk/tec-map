//External imports
const express = require("express");
const router = express.Router();

const friendController = require("../controllers/friends.controller");

router.route("")
    .get(friendController.getAllFriends);

router.route("/:friendId")
    .post(friendController.addFriend)
    .delete(friendController.deleteFriendByID);

//Exports
module.exports = router;