const User = require("../models/User");

const checkTokenState = async (req, res, next) => {
    const token = req.get('Authentication');
    let user = null;
    if (!!token) {
        user = await User.findOne({ token });
    }

    if (token && !user) {
        return res.status(401).send({ error: 'Wrong token!' });
    }
    req.user = user;
    next();
}

module.exports = checkTokenState;