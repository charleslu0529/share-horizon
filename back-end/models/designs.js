const mongoose = require("mongoose");

const design = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: { type: Date, default: Date.now },
    userID: {
        type: String,
        required: true,
    },
    images:Array,
    featured:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("designs", design);
