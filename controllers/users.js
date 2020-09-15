const users = require('../models').Users;
const { assignToken } = require("../helpers/assignToken");

const login = async (req, res) => {
    try {
        const { email } = req.user._json;
        const user = await users.findOne({ where: { email: email } });
        if (!user) { return res.status(404).json({ error: "user is not registered!" }) }
        const token = assignToken({ userName: user.name, email: user.email });
        return res.status(200).json({ message: "successfully logged in!", token });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    login
}
