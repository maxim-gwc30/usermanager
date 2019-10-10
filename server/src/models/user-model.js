const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
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
    userName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel