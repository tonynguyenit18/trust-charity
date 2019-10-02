const express = require("express");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const router = new express.Router();

router.post("/", async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!email || !password) {
        return res.status(400).json({ msg: "A required field is missing!" })
    }

    const user = await User.findOne({ email }).lean();

    if (!user) {
        return res.status(400).json({ msg: "User does not exist!" })
    }

    bcrypt.compare(password, user.password, async (err, succeed) => {
        if (err) {
            return res.json({ msg: "An error occurs when checking password. Please try again" })
        }
        if (!succeed) {
            return res.status(400).json({ msg: "User or password is incorrect!" })
        }

        jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 }, (rrror, token) => {
            delete user.password;
            user.token = token
            return res.status(200).json({
                user
            })
        })
    })
})



module.exports = router;