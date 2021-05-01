const mongoose = require("mongoose");

const design = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: { type: Date, default: Date.now },
    // user: {
    //     type: Number,
    //     required: true,
    // },
});

module.exports = mongoose.model("designs", design);
