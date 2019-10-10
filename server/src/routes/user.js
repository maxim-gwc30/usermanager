const express = require('express')
const router = express.Router()
const User = require('../models/user-model')

router.get('/user', function (req, res, next) {
    var filter = "this._id!=''"

    try {
        if (req.query.filter) filter = req.query.filter
    } catch (error) {
        return next(error)
    }
console.log(filter)
    User.find({$where:filter},function (err, users) {
        if (err) {
            console.log('Get user Error', err)
        } else {
            res.send(users)
        }
    })
})

router.post('/user', function (req, res, next) {
    if (!req.body._id) {
        User.create(req.body, function (err, user) {
            if (err) {
                console.log('Insert Error', err)
            } else {
                res.send(user)
                console.log('Successful Insert', user)
            }
        })
    }
});

module.exports = router