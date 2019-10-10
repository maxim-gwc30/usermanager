const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    lastName: {
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    middleName: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: String,
    },
    position: {
        required: true,
        type: String
    },
    salary: {
        required: true,
        type: Number
    }
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema)
module.exports = EmployeeModel