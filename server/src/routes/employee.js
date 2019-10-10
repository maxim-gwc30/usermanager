const express = require('express')
const router = express.Router()
const Employee = require('../models/employee-model')

router.post('/employee', function (req, res, next) {
    if (!req.body._id) {
        Employee.create(req.body, function (err, employee) {
            if (err) {
                console.log('Insert Error', err)
            } else {
                res.send(employee)
            }
        })
    }
})

router.get('/employee', function (req, res, next) {
    var filter = "this._id!=''";

    try {
        if (req.query.filter) filter = req.query.filter
    } catch (error) {
        return next(error)
    }
    
    Employee.find({ $where: filter }, function (err, employees) {
        if (err) {
            console.log('Get employee Error', err)
        } else {
            res.send(employees)
        }
    })
})

router.patch('/employee', function (req, res, next) {
    Employee.updateOne({_id: req.body._id}, req.body, { new: true }, function (err, employee) {
        if (err) {
            console.log('Patch employee Error', err)
        } else {
            res.status(200).send({ success: true, message: 'Update employee success.' })
        }
    })
})

router.delete('/employee/:id', function(req, res, next){
    
    Employee.findOneAndRemove({'_id' : req.params.id}, function (err, user){
        if (err) {
            console.log('Delete employee Error', err)
        }
        else {
            res.sendStatus(200);
        }
    });
});

module.exports = router