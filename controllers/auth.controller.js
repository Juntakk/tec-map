//Internal imports
const User = require("../models/User");
const jwt = require("jsonwebtoken")

//Login 
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const filter = { "email": email };
        const user = await User.findOne(filter);

        //Validations
        if (email === "" || password === "") {
            return res.status(400).send();
        }
        if (!user || user.password !== password || !email || user.email !== email) {
            return res.status(401).send();
        }

        //Get & Send Token
        const token = jwt.sign({ id: user._id }, "toto");
        return res.send(token);

    } catch (error) {
        res.status(500).send("An error occurred. Please try again later.");
    }
};


//Register 
exports.register = async (req, res) => {
    try {
        const body = req.body;
        const filterEmail = { "email": body.email };
        const existingUserByEmail = await User.findOne(filterEmail);

        //Validations
        if (!body.email || !body.password || !body.username || !body.fullName) {
            return res.status(400).send();
        }
        if (existingUserByEmail) {
            return res.status(409).send();
        }

        //Création & Envoi token
        await User.create(body);
        const token = jwt.sign({ "id": User._id }, "toto");
        res.status(201).send(token);

    } catch (error) {
        res.status(500).send("An error occurred. Please try again later.");
    }
}