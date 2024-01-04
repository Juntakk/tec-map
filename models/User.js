//External imports
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    friends: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

//Exports
module.exports = mongoose.model("User", userSchema);