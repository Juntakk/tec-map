//Internal imports
const User = require("../models/User");
const authUtils = require("../utils/auth.utils");

//Get all users
exports.getAllUsers = async (req, res) => {
    try {

        //Validation
        const isTokenValid = authUtils.protect(req);
        if (!isTokenValid) {
            return res.status(401).send();
        }

        //Récupérer et afficher tous les utilisateurs
        const users = await User.find()
            .select("_id username fullName");
        return res.send(users);

    } catch (error) {
        return res.status(500).send("An error has occured. Please try again later.");
    }
};
