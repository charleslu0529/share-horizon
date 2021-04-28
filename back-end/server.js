require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const { PORT, BACKEND_URL, DB_URL } = process.env;

app.get("/", (req, res)=> {
    res.status(200).send("You've hit the server!");
});

// Connect to DB
mongoose.connect(DB_URL, { useUnifiedTopology: true }, () => console.log("Connected to DB!"));

app.listen(PORT, (error) =>
    error
        ? console.error("Couldn't start server", error)
        : console.info(`Server running on ${BACKEND_URL}:${PORT}`)
);
