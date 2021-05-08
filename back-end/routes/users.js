const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("../Authentication/authenticator");

router.get("/", async (req, res) => {
    try {
        const existingUsers = Users.find();
        res.status(200).json(existingUsers);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get("/current", (req, res) => {
    res.status(200).send(req.user);
});

router.post("/", async (req, res) => {
    Users.findOne({ username: req.body.username }, async (error, doc) => {
        if (error) throw error;
        if (doc) res.send("User already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new Users({
                username: req.body.username,
                email: req.body.username,
                password: hashedPassword,
            });
            try {
                await newUser.save();
                res.status(201).json("User Created");
            } catch (error) {
                res.status(500).json({ message: error });
            }
        }
    });
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) throw error;
        if (!user) res.status(500).json(info);
        else {
            req.login(user, (error) => {
                if (error) throw error;
                res.send("Logged in successfully");
            });
        }
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    req.logout();
    res.status(200).send("User logged out");
});

module.exports = router;
