//Internal imports
const User = require("../models/User");
const authUtils = require("../utils/auth.utils");

//Get current user
exports.getMe = async (req, res) => {
    try {
        const isTokenValid = authUtils.protect(req);
        const id = req.userId;
        const filter = { "_id": id };
        const user = await User.findOne(filter);

        //Validations
        if (!isTokenValid) {
            return res.status(401).send();
        }
        if (!user) {
            return res.status(404).send();
        }

        //Afficher informations de l'utilisateur
        return res.send(user);

    } catch (error) {
        return res.status(500).send("An error occurred. Please try again later.");
    }
};

//Update current user
exports.putMe = async (req, res) => {
    try {

        const id = req.userId;
        const filter = { "_id": id };
        const filterEmail = { "email": req.body.email };
        const emailCheck = await User.findOne(filterEmail)

        //Validations
        const isTokenValid = authUtils.protect(req);
        if (!isTokenValid) {
            return res.status(401).send();
        }
        if (emailCheck) {
            return res.status(409).send();
        }

        //Mis à jour de l'utilisateur
        await User.updateOne(filter, req.body);
        return res.send("Vos informations ont été modifiées.")

    } catch (error) {
        return res.status(500).send(error);
    }
};

//Delete current user
exports.deleteMe = async (req, res) => {
    try {
        const isTokenValid = authUtils.protect(req);
        const id = req.userId;
        const filter = { "_id": id };

        //Validation
        if (!isTokenValid) {
            return res.status(401).send();
        }

        //Suppression de l'utilisateur
        await User.deleteOne(filter);
        return res.status(204).send();

    } catch (error) {
        return res.status(500).send("An error occurred. Please try again later.");
    }
}