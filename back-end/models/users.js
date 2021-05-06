const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    email:String,
    name:String,
    location:String,
    password: String,
});

module.exports = mongoose.model("User", user);
