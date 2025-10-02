const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [ 3, 'username must be at least 3 characters long']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [ 3, 'Email must at least 13 character long']
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [ 5, 'password must be at least 5 character long']
    },
    
},
    {timestamps: true}
)

const user = mongoose.model('user', userSchema)

module.exports = user;