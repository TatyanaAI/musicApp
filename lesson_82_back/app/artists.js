const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const config = require('../config');
const Artist = require("../models/Artist");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const createRouter = () => {
  router.post("/", upload.single('photo'), async (req, res) => {
    let result = await Artist.findOne({ name: req.body.name })
    if (result) {
      return res.send(result);
    }
    
    const artist = { ...req.body };

    if (req.file) {
      artist.photo = req.file.filename;
    }

    result = new Artist(artist);
    try {
      await result.save();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const artists = await Artist.find();
      res.send(artists);
     
    } catch (e) {
      res.sendStatus(500).send(e);;
    }
  });

  return router;
};


module.exports = createRouter;