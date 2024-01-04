//External imports
const jwt = require("jsonwebtoken");

//Internal imports
const User = require("../models/User")

//Protect
exports.protect = (req) => {
    try {
        //Get token
        let token = req.headers.authorization;

        //Check if token starts with "bearer " and not Undefined
        if (token === undefined || !token.startsWith("Bearer")) {
            return false;
        };

        //Remove "bearer"
        token = token.split(" ")[1];

        //Décrypter
        const decodedToken = jwt.verify(token, "toto");
        req.userId = decodedToken.id;
        return true;

    } catch (error) {
        return false;
    }
}
