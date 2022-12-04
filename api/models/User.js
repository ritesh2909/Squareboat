const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''

    },
    city: {
        type: String,
        default: ''
    },
    from: {
        type: String,
        default: ''
    },
    relationship: {
        type: String,
        enum: [1, 2, 3],
    },

},
    { timestamps: true }
);


const User = mongoose.model('User', UserSchema);
module.exports = User;



