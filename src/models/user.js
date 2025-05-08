const mongoose = require('mongoose');
const User = mongoose.mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friends: []
})

module.exports = User;