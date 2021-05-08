const express = require("express");
const router = express.Router();
const Designs = require("../models/designs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({storage});

router.get("/", async (req, res) => {
    try {
        const designs = await Designs.find();
        res.status(200).send(designs);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const design = await Designs.findById(req.params.id);
        res.status(200).send(design);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.post("/", upload.array("imageFiles") ,async (req, res) => {
    const design = new Designs({
        title: req.body.title,
        description: req.body.description,
        userID:req.body.userID,
        images:req.files.map(file=>file.filename),
        featured:req.files[req.body.featured].filename
    });

    try {
        const savedDesign = await design.save();
        res.status(200).json(savedDesign);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const removedDesign = Designs.remove({ _id: req.params.id });
        res.status(200).json(removedDesign);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const edittedDesign = Designs.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(edittedDesign);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

module.exports = router;
