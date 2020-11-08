const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    username: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    sleep_time: {type: Date},
    wake_time: {type: Date},
    length: {type: Number}
})

const Logs = mongoose.model("Log", LogSchema)

module.exports = Logs