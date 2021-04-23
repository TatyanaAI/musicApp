const express = require("express");
const router = express.Router();
const TrackHistory = require("../models/TrackHistory");
const User = require("../models/User");
const Track = require("../models/Track");


const createRouter = () => {
    router.post("/", async (req, res) => {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).send({ error: 'No token present' });
        }

        let user = await User.findOne({ token });

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        try {

            let track = await Track.findById(req.body.track).populate('track');

            if (!track) {
                return res.status(400).send({ error: 'Incorrect track id' });
            }

            const history = {
                user: user,
                track: track,
                datetime: new Date().toJSON().slice(0, 10)
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

    return router;
};


module.exports = createRouter;