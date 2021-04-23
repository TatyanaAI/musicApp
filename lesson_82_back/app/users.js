const express = require("express");
const router = express.Router();
const User = require("../models/User");


const createRouter = () => {
    router.post("/", async (req, res) => {
        let result = await User.findOne({ username: req.body.username })
        if (result) {
            return res.send(result);
        }
        const user = { ...req.body };
        result = new User(user);
        result.generateToken();
        try {
            await result.save();
            res.send(result);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    });


    return router;
};


module.exports = createRouter;