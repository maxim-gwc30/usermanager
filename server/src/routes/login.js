const express = require('express')
const router = express.Router()
const User = require('../models/user-model')

router.patch('/login', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    User.findOne({ userName: userName, password: password }, {password: 0}).exec(function (err, user) {
        if(err) throw err;

        if (user) {
            res.send(user)
        } else {
            res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' })
        }
    });
})

module.exports = router