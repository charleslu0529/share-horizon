require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/users");
const designsRoute = require("./routes/designs");
const passport = require("./Authentication/authenticator");
const { PORT, BACKEND_URL, DB_URL } = process.env;
const initializePassport = require("./passport-config");

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // Accept cookies from request
    })
);
app.use(express.static("public"));
app.use(cookieParser("something"));
app.use(session({ secret: "something" }));
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

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
