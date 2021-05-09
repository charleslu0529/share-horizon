const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    email:String,
    name:String,
    location:String,
    about:String,
    password: String,
});

module.exports = mongoose.model("User", user);
