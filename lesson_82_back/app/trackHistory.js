const express = require("express");
const router = express.Router();
const TrackHistory = require("../models/TrackHistory");
const Track = require("../models/Track");
const auth = require("../middleware/auth");


const createRouter = () => {
    router.post("/", auth, async (req, res) => {
        try {
            let track = await Track.findById(req.body.track).populate("album");

            if (!track) {
                return res.status(400).send({ error: 'Incorrect track id' });
            }

            const history = {
                user: req.user,
                track: track,
                datetime: new Date().toISOString()
            }
            const historyPoint = new TrackHistory(history);

            await historyPoint.save();
            return res.send(historyPoint);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });

    router.get("/", auth, async (req, res) => {
        try {

            let trackHistory = await TrackHistory.find({ "user": req.user.id }).sort({ "datetime": -1 }).populate({
                path: 'track', populate: { path: "album", populate: { path: "artist" } }
            });

            res.send(trackHistory);
        }
        catch (err) {
            console.error(e.message)
            res.sendStatus(500).send(e);
        }
    });

    return router;
};


module.exports = createRouter;