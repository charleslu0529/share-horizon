const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    email:String,
    name:String,
    image:String,
    location:String,
    about:String,
    password: String,
});

module.exports = mongoose.model("User", user);
