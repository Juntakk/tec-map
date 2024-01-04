//Internal imports
const User = require("../models/User");
const authUtils = require("../utils/auth.utils");

//Get friends
exports.getAllFriends = async (req, res) => {

    //Validation
    const isTokenValid = authUtils.protect(req);
    if (!isTokenValid) {
        return res.status(401).send();
    }

    //Récupération des amis
    const id = req.userId;
    const filter = { "_id": id };
    const user = await User.findOne(filter)
        .populate("friends", "_id username")
    const friends = user.friends;
    return res.send(friends);
}

//Add friend
exports.addFriend = async (req, res) => {
    try {
        const isTokenValid = authUtils.protect(req);
        const userID = req.userId;
        const friendID = req.params.friendId;
        const filter = { "_id": userID };
        const user = await User.findOne(filter);
        const users = await User.find();

        //Validations
        if (!isTokenValid) {
            return res.status(401).send();
        }
        if (userID.toString() === friendID) {
            return res.status(409).send();
        }
        if (users.includes(friendID)) {
            return res.status(404).send();
        }
        if (user.friends.includes(friendID)) {
            return res.status(409).send();
        }

        //Ajout d'ami
        user.friends.push(friendID);
        await user.save();
        return res.status(200).send("Ami ajouté.");

    } catch (error) {
        console.error(error);
        return res.status(500).send("An error has occurred. Try again later");
    }
};

//Delete friend
exports.deleteFriendByID = async (req, res) => {
    try {
        const isTokenValid = authUtils.protect(req);
        const id = req.userId;
        const filter = { "_id": id };
        const friendId = req.params.friendId;
        const user = await User.findOne(filter);

        //Validations
        if (!isTokenValid) {
            return res.status(401).send();
        }
        if (id.toString() === friendId) {
            return res.status(409).send();
        }
        if (!user.friends.includes(friendId)) {
            return res.status(409).send();
        }

        //Suppression d'ami
        const friendIndex = user.friends.indexOf(friendId);
        user.friends.splice(friendIndex, 1);
        await user.save();

        res.send("Ami supprimé.");

    } catch (error) {
        console.error(error);
        return res.status(500).send("An error has occurred. Please try again later.");
    }
};
