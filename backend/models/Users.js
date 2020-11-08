const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    passHash: {type: String}
})

const Users = mongoose.model("User", UserSchema)

module.exports = Users