//Internal imports
const User = require("../models/User");
const authUtils = require("../utils/auth.utils");

//Update position
exports.putPosition = async (req, res) => {
    try {

        const id = req.userId;
        const filter = { "_id": id };

        //Validations
        const isTokenValid = authUtils.protect(req);
        if (!isTokenValid) {
            return res.status(401).send();
        }
        if (req.body.latitude === undefined || req.body.longitude === undefined) {
            return res.status(400).send();
        }
        if (req.body.latitude === "" || req.body.longitude === "") {
            return res.status(400).send();
        }


        //Mise à jour de la position
        await User.updateOne(filter, req.body);
        return res.send("Votre position a été enregistrée.")

    } catch (error) {
        return res.status(500).send("An error has occured. Please try again later.");
    }
};

//Get all friend's positions
exports.getPositionFriend = async (req, res) => {
    try {

        //Validation
        const isTokenValid = authUtils.protect(req);
        if (!isTokenValid) {
            return res.status(401).send();
        }

        //Récupérer et affiche la position des amis
        const id = req.userId;
        const userFilter = { "_id": id };
        const user = await User.findOne(userFilter)
            .populate("friends", "_id latitude longitude");
        const friendsPosition = user.friends;

        return res.send(friendsPosition);

    } catch (error) {
        return res.status(500).send("An error has occured. Please try again later.");
    }
}