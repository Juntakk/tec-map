//External imports
const express = require("express");
const mongoose = require("mongoose");

//Routes
const authRoute = require("./routes/auth.route.js");
const positionRoute = require("./routes/position.route.js");
const friendRoute = require("./routes/friends.route.js");
const userRoute = require("./routes/users.route.js");
const meRoute = require("./routes/me.route.js");

//Variables
const app = express();
const PORT = 5000;

//Connect to database
const connect = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://dev:juntakk123@tecmap.sqcaqkp.mongodb.net/");
        console.log("Database connected to: " + con.connection.host)

    } catch (error) {
        console.log("MONGO DB error: " + error)
    }
}
connect();

//Body Parser
app.use(express.json());

//Routers
app.use("/auth", authRoute);
app.use("/position", positionRoute);
app.use("/friends", friendRoute);
app.use("/users", userRoute);
app.use("/me", meRoute);

//Port listener
app.listen(PORT, () => {
    console.log("Server listed on port: " + PORT)
});