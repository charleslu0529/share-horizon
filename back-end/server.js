require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/users");
const designsRoute = require("./routes/designs");
const initializePassport = require("./passport-config");
const passport = require("./Authentication/authenticator");
const { PORT, BACKEND_URL, DB_URL } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use("/users", userRoute);
app.use("/designs", designsRoute);

app.get("/", (req, res) => {
    res.status(200).send("You've hit the server!");
});

// Connect to DB
mongoose.connect(
    DB_URL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to DB!")
);

app.listen(PORT, (error) =>
    error
        ? console.error("Couldn't start server", error)
        : console.info(`Server running on ${BACKEND_URL}:${PORT}`)
);
