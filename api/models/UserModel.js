const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
},{
    timestamps: true
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel