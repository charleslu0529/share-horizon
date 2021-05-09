const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const passport = require("../Authentication/authenticator");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const cleanedFilename = file.originalname.replace(/\s/g, '');
        cb(null, Date.now() + "-" + cleanedFilename);
    },
});

const upload = multer({ storage });

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

router.get("/:id", async (req, res) => {
    try {
        const requestedUser = await Users.findById(req.params.id);
        res.status(200).json(requestedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
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

router.put("/:id",upload.single("image"), async (req, res) => {

    let newUserData = {
        username: req.body.email,
        email: req.body.email,
        name: req.body.name,
        location: req.body.location,
        about: req.body.about,
    };

    if (req.file) {
        newUserData.image = req.file.filename;
    }

    try {
        const result = await Users.updateOne(
            { _id: req.params.id },
            {$set: newUserData}
        );
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) throw error;
        if (!user) res.status(500).json(info);
        else {
            req.login(user, (error) => {
                if (error) throw error;
                res.status(200).send("Successfully logged in");
            });
        }
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    req.logout();
    res.status(200).send("User logged out");
});

module.exports = router;
